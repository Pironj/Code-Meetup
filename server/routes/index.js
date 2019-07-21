const path = require('path');
const authRoutes = require('../routes/api/authRoutes');
const router = require('express').Router();
const apiRoutes = require('./api');

// const authRoutes = require('./api/authRoutes');

router.get("/", function(req, res) {
  console.log("THIS IS MY REDIRECT REQUEST", req.rawHeaders[11]);
  const redir = req.rawHeaders[11];
res.redirect(redir);
})

// API Routes
router.use('/api', apiRoutes);
router.use(authRoutes);





// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
module.exports = router;
