const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const eventRoutes = require('./eventRoutes');
const userEventRoutes = require('./userEventRoutes');


// // User routes
router.use('/users', userRoutes);

// Event routes
router.use('/events', eventRoutes);

// Comment routes
router.use('/comments', commentRoutes);

// userEvent routes
router.use('/userEvents', userEventRoutes);


module.exports = router;
