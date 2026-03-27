const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');

// PUT /api/users/profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, avatar } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           avatar = COALESCE($2, avatar)
       WHERE id = $3
       RETURNING id, name, email, avatar, role, created_at`,
      [name || null, avatar || null, req.user.id]
    );

    res.json({ message: 'Profile updated!', user: result.rows[0] });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/users/password
router.put('/password', authMiddleware, async (req, res) => {
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    return res.status(400).json({
      error: 'Both current and new password are required.',
    });
  }

  if (new_password.length < 6) {
    return res.status(400).json({
      error: 'New password must be at least 6 characters.',
    });
  }

  try {
    const result = await pool.query(
      'SELECT password FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = result.rows[0];

    const valid = await bcrypt.compare(current_password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    const hashed = await bcrypt.hash(new_password, 10);
    await pool.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashed, req.user.id]
    );

    res.json({ message: 'Password changed successfully!' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;