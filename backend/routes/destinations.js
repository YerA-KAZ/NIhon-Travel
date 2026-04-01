const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

const DESCRIPTION_OVERRIDES = {
  'mount fuji': 'Japan\'s highest mountain at 3,776 meters and a UNESCO World Heritage site long revered as a sacred peak.',
  'kyoto - fushimi inari': 'Kyoto\'s head Inari shrine is famous for its vermilion torii gates climbing Mount Inari.',
  'tokyo - shibuya crossing': 'A famous scramble crossing outside Shibuya Station, often cited as one of the world\'s busiest.',
  'arashiyama bamboo grove': 'A celebrated bamboo grove district in western Kyoto known for seasonal scenery and calm morning walks.',
  'osaka castle': 'A landmark first built in 1583; today\'s restored main tower houses a museum overlooking Osaka.',
  'nara deer park': 'Nara Park is known for its free-roaming sika deer and nearby heritage sites such as Todai-ji Temple.',
  'hiroshima peace memorial': 'Hiroshima Peace Memorial Park and the Genbaku Dome commemorate the victims of the 1945 atomic bombing and stand as symbols of peace.',
  'hakone hot springs': 'A classic hot-spring getaway in Fuji-Hakone-Izu National Park, known for onsen, volcanic landscapes and, on clear days, views of Mount Fuji.',
  'okinawa beaches': 'Okinawa\'s subtropical islands are known for white-sand beaches, clear blue water and coral reefs popular for swimming, snorkeling and diving.',
  'nikko toshogu shrine': 'An ornate shrine complex in Nikko that enshrines Tokugawa Ieyasu, famed for lavish carvings including the Three Wise Monkeys.',
  'sapporo snow festival': 'Held each winter in Sapporo, this major festival fills the city with large snow sculptures, ice art and illuminated displays.',
  'kyoto gion district': 'Kyoto\'s historic geisha district is known for traditional machiya streets, teahouses and chances to glimpse geiko and maiko.'
};

function normalizeDestination(destination) {
  const key = String(destination.name || '').trim().toLowerCase();
  const description = DESCRIPTION_OVERRIDES[key];

  if (!description) {
    return destination;
  }

  return {
    ...destination,
    description
  };
}

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
      destinations: result.rows.map(normalizeDestination),
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

    res.json({ destination: normalizeDestination(result.rows[0]) });
  } catch (err) {
    console.error('Get destination error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
