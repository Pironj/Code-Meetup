const router = require('express').Router();
const eventController = require('../../controllers/eventController');
const auth = require('../../controllers/authController');

// // Matches with "/api/events"
router.route('/')
  .get(eventController.findAll)
  .post(auth.authorizeUser, eventController.create); // to protect in auth.authorizeUserBody

// // Matches with "/api/events/:id"
router.route('/:id')
  .get(eventController.findById)
  .put(auth.authorizeUser, eventController.update) // to protect in auth.authorizeUserBody
  .delete(auth.authorizeUser, eventController.remove); // to protect in auth.authorizeUserBody

router.route('/near/:latitude/:longitude')
  .get(eventController.findNear);


module.exports = router;
