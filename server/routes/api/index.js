const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const eventRoutes = require('./eventRoutes');
const userEventRoutes = require('./userEventRoutes');
const eventLikeRoutes = require('./eventLikeRoutes');


// // User routes
router.use('/users', userRoutes);

// Event routes
router.use('/events', eventRoutes);

// Comment routes
router.use('/comments', commentRoutes);

// userEvent routes
router.use('/userEvents', userEventRoutes);

// EventLike routes
router.use('/eventLikes', eventLikeRoutes);


module.exports = router;
