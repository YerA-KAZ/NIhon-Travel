const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');

// POST /api/messages
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    // Get user_id if logged in
    let userId = null;
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      try {
        const jwt = require('jsonwebtoken');
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        userId = decoded.id;
      } catch (e) {
        // not logged in, ignore
      }
    }

    const result = await pool.query(
      `INSERT INTO messages (user_id, name, email, subject, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        userId,
        name.trim(),
        email.toLowerCase().trim(),
        subject || 'General Inquiry',
        message.trim(),
      ]
    );

    res.status(201).json({
      message: "Your message has been sent! We'll get back to you soon.",
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/messages/my
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, subject, message, is_read, created_at
       FROM messages
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json({ messages: result.rows });
  } catch (err) {
    console.error('Get user messages error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;