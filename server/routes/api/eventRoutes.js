const router = require('express').Router();
const eventController = require('../../controllers/eventController');
const auth = require('../../controllers/authController');

// // Matches with "/api/events"
router.route('/')
  .get(eventController.findAll)
  .post(eventController.create); // to protect in auth.authorizeUserParams

// // Matches with "/api/events/:id"
router.route('/:id')
  .get(eventController.findById)
  .put(eventController.update) // to protect in auth.authorizeUserParams
  .delete(eventController.remove); // to protect in auth.authorizeUserParams

router.route('/near/:latitude/:longitude')
  .get(eventController.findNear);


module.exports = router;
