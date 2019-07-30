const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const eventRoutes = require('./eventRoutes');
const userEventRoutes = require('./userEventRoutes');
const auth = require('../../controllers/authController');

// // User routes
router.use('/users', userRoutes); // add auth routes auth.authorizeUser

// Event routes
router.use('/events', eventRoutes);

// Comment routes
router.use('/comments', commentRoutes); // add auth routes auth.authorizeUser

// userEvent routes
router.use('/userEvents', userEventRoutes); // add auth routes auth.authorizeUser


module.exports = router;
