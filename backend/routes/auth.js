const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');
const { sendResetEmail } = require('../utils/sendEmail');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  try {
    // Check if email already exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, avatar, role, created_at',
      [name.trim(), email.toLowerCase().trim(), hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        created_at: user.created_at
      }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        created_at: user.created_at
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, avatar, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});


// POST /api/auth/forgot-password

// Generates a secure reset token, stores its SHA-256 hash
// in the DB with a 30-minute TTL, and emails a reset link.
// ALWAYS returns 200 to prevent user enumeration.

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  // Minimal format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);

    // Even if user doesn't exist, return success to prevent user enumeration
    if (userResult.rows.length === 0) {
      return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
    }

    const userId = userResult.rows[0].id;

    // Invalidate any existing unused tokens for this user
    await pool.query(
      'UPDATE password_reset_tokens SET used = TRUE WHERE user_id = $1 AND used = FALSE',
      [userId]
    );

    // Generate a cryptographically secure random token
    const rawToken = crypto.randomBytes(32).toString('hex');

    // Store only the SHA-256 hash of the token in the database
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    // Set expiry to 30 minutes from now
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await pool.query(
      'INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
      [userId, tokenHash, expiresAt]
    );

    // Build the reset link (the raw token goes in the URL, NOT the hash)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetLink = `${frontendUrl}/reset-password?token=${rawToken}`;

    // Send the email
    await sendResetEmail(normalizedEmail, resetLink);

    res.json({ message: 'If an account with that email exists, a reset link has been sent.' });

  } catch (err) {
    console.error('Forgot password error:', err);
    // Still return 200 to avoid leaking info
    res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
  }
});

// POST /api/auth/reset-password
// Validates the token, checks it hasn't expired or been
// used, then hashes the new password with bcrypt and
// updates the user record. Marks the token as used.

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  try {
    // Hash the incoming token to compare against stored hash
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find the token record
    const tokenResult = await pool.query(
      `SELECT prt.id, prt.user_id, prt.expires_at, prt.used
       FROM password_reset_tokens prt
       WHERE prt.token_hash = $1`,
      [tokenHash]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired reset link. Please request a new one.' });
    }

    const tokenRecord = tokenResult.rows[0];

    // Check if already used
    if (tokenRecord.used) {
      return res.status(400).json({ error: 'This reset link has already been used. Please request a new one.' });
    }

    // Check if expired
    if (new Date() > new Date(tokenRecord.expires_at)) {
      // Mark as used so it can't be retried
      await pool.query('UPDATE password_reset_tokens SET used = TRUE WHERE id = $1', [tokenRecord.id]);
      return res.status(400).json({ error: 'This reset link has expired. Please request a new one.' });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user's password
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, tokenRecord.user_id]);

    // Mark token as used
    await pool.query('UPDATE password_reset_tokens SET used = TRUE WHERE id = $1', [tokenRecord.id]);

    res.json({ message: 'Password has been reset successfully. You can now sign in with your new password.' });

  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error during password reset.' });
  }
});

module.exports = router;