const router = require('express').Router();
const bookRoutes = require('./books');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const eventRoutes = require('./eventRoutes');
const userEventRoutes = require('./userEventRoutes');

// Book routes
router.use('/books', bookRoutes);

// // User routes
router.use('/users', userRoutes);

// Event routes
router.use('/events', eventRoutes);

// Comment routes
router.use('/comments', commentRoutes);

// userEvent routes
router.use('/userEvents', userEventRoutes);



module.exports = router;
