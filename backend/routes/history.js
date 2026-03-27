const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');

// GET /api/history
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT h.id, h.viewed_at, d.*
       FROM history h
       JOIN destinations d ON h.destination_id = d.id
       WHERE h.user_id = $1
       ORDER BY h.viewed_at DESC
       LIMIT 50`,
      [req.user.id]
    );
    res.json({ history: result.rows });
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/history
router.post('/', authMiddleware, async (req, res) => {
  const { destination_id } = req.body;

  if (!destination_id) {
    return res.status(400).json({ error: 'destination_id is required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO history (user_id, destination_id) VALUES ($1, $2) RETURNING *',
      [req.user.id, destination_id]
    );
    res.status(201).json({ message: 'View recorded.', history: result.rows[0] });
  } catch (err) {
    console.error('Add history error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/history  (clear all)
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM history WHERE user_id = $1', [req.user.id]);
    res.json({ message: 'History cleared.' });
  } catch (err) {
    console.error('Clear history error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;