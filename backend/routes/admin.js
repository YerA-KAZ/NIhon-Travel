const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { adminMiddleware } = require('../middleware/auth');

// GET /api/admin/destinations - Get all (with counts)
router.get('/destinations', adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM destinations ORDER BY id DESC');
    res.json({ destinations: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/admin/destinations - Create destination
router.post('/destinations', adminMiddleware, async (req, res) => {
  const { name, description, image_url, category, location, rating } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO destinations (name, description, image_url, category, location, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, image_url, category || 'general', location, parseFloat(rating) || 0]
    );
    res.status(201).json({ message: 'Destination created!', destination: result.rows[0] });
  } catch (err) {
    console.error('Create destination error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/admin/destinations/:id - Update destination
router.put('/destinations/:id', adminMiddleware, async (req, res) => {
  const { name, description, image_url, category, location, rating } = req.body;

  try {
    const result = await pool.query(
      `UPDATE destinations 
       SET name = COALESCE($1, name), 
           description = COALESCE($2, description),
           image_url = COALESCE($3, image_url),
           category = COALESCE($4, category),
           location = COALESCE($5, location),
           rating = COALESCE($6, rating)
       WHERE id = $7
       RETURNING *`,
      [name, description, image_url, category, location, rating ? parseFloat(rating) : null, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Destination not found.' });
    }

    res.json({ message: 'Destination updated!', destination: result.rows[0] });
  } catch (err) {
    console.error('Update destination error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/admin/destinations/:id - Delete destination
router.delete('/destinations/:id', adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM destinations WHERE id = $1 RETURNING id', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Destination not found.' });
    }

    res.json({ message: 'Destination deleted.' });
  } catch (err) {
    console.error('Delete destination error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/admin/messages - Get all messages
router.get('/messages', adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.*, u.name as user_name FROM messages m
       LEFT JOIN users u ON m.user_id = u.id
       ORDER BY m.created_at DESC`
    );
    res.json({ messages: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/admin/users - Get all users
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, avatar, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({ users: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/admin/stats - Dashboard stats
router.get('/stats', adminMiddleware, async (req, res) => {
  try {
    const [users, destinations, messages, favorites] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM users'),
      pool.query('SELECT COUNT(*) FROM destinations'),
      pool.query('SELECT COUNT(*) FROM messages'),
      pool.query('SELECT COUNT(*) FROM favorites')
    ]);

    res.json({
      stats: {
        users: parseInt(users.rows[0].count),
        destinations: parseInt(destinations.rows[0].count),
        messages: parseInt(messages.rows[0].count),
        favorites: parseInt(favorites.rows[0].count)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;