// const path = require('path');

const router = require('express').Router();
const apiRoutes = require('./api');

// const authRoutes = require('./api/authRoutes');


// API Routes
router.use('/api', apiRoutes);
// router.use(authRoutes);





// If no API routes are hit, send the React app
router.use(function(req, res, err) {
  if (err) {
    console.log(err);
  }
  // console.log(req._passport);
  // console.log(res)
  // res.redirect('/')
});

module.exports = router;
