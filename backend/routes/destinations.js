const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET /api/destinations
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 12, offset = 0 } = req.query;

    let query = 'SELECT * FROM destinations';
    const params = [];
    const conditions = [];

    if (category && category !== 'all') {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(
        `(name ILIKE $${params.length} OR description ILIKE $${params.length} OR location ILIKE $${params.length})`
      );
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY rating DESC, id ASC';

    params.push(parseInt(limit));
    query += ` LIMIT $${params.length}`;

    params.push(parseInt(offset));
    query += ` OFFSET $${params.length}`;

    const result = await pool.query(query, params);

    // Count total
    let countQuery = 'SELECT COUNT(*) FROM destinations';
    const countParams = params.slice(0, -2);
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
    }
    const countResult = await pool.query(countQuery, countParams);

    res.json({
      destinations: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (err) {
    console.error('Get destinations error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/destinations/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM destinations WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Destination not found.' });
    }

    res.json({ destination: result.rows[0] });
  } catch (err) {
    console.error('Get destination error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;