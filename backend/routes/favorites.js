const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');

// GET /api/favorites
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT f.id, f.created_at, d.*
       FROM favorites f
       JOIN destinations d ON f.destination_id = d.id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [req.user.id]
    );
    res.json({ favorites: result.rows });
  } catch (err) {
    console.error('Get favorites error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/favorites  (toggle)
router.post('/', authMiddleware, async (req, res) => {
  const { destination_id } = req.body;

  if (!destination_id) {
    return res.status(400).json({ error: 'destination_id is required.' });
  }

  try {
    // Check destination exists
    const dest = await pool.query(
      'SELECT id FROM destinations WHERE id = $1',
      [destination_id]
    );
    if (dest.rows.length === 0) {
      return res.status(404).json({ error: 'Destination not found.' });
    }

    // Check if already favorited
    const existing = await pool.query(
      'SELECT id FROM favorites WHERE user_id = $1 AND destination_id = $2',
      [req.user.id, destination_id]
    );

    if (existing.rows.length > 0) {
      // Remove
      await pool.query(
        'DELETE FROM favorites WHERE user_id = $1 AND destination_id = $2',
        [req.user.id, destination_id]
      );
      return res.json({ message: 'Removed from favorites.', action: 'removed' });
    }

    // Add
    const result = await pool.query(
      'INSERT INTO favorites (user_id, destination_id) VALUES ($1, $2) RETURNING *',
      [req.user.id, destination_id]
    );

    res.status(201).json({
      message: 'Added to favorites!',
      favorite: result.rows[0],
      action: 'added',
    });
  } catch (err) {
    console.error('Toggle favorite error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/favorites/:destination_id
router.delete('/:destination_id', authMiddleware, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND destination_id = $2',
      [req.user.id, req.params.destination_id]
    );
    res.json({ message: 'Removed from favorites.' });
  } catch (err) {
    console.error('Delete favorite error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;