const path = require('path');
const authRoutes = require('../routes/api/authRoutes');
const router = require('express').Router();
const apiRoutes = require('./api');


// API Routes
router.use('/api', apiRoutes);

// Auth Routes
router.use('/auth', authRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  // console.log('here')
  // console.log('path', path.join(__dirname, '../../client/build/index.html'))
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
