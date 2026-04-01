require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
const configuredOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools and same-origin requests.
      if (!origin) return callback(null, true);
      if (origin === configuredOrigin) return callback(null, true);
      return callback(new Error('CORS origin not allowed'));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from original frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../react-frontend/dist')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/history', require('./routes/history'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Japan Travel API is running', timestamp: new Date() });
});

// Serve React Routes (add any new React paths here)
const reactRoutes = ['/anime-atlas', '/AnimeAtlas', '/places', '/Places'];
app.get(reactRoutes, (req, res) => {
  res.sendFile(path.join(__dirname, '../react-frontend/dist/index.html'));
});

// Serve original frontend index.html for root or any other unhandled route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`

      🗾 Japan Travel API Server Running            
      Port: ${PORT}                                 
      Env:  ${process.env.NODE_ENV || 'development'}
      (http://localhost:${PORT})                    

  `);
});

module.exports = app;