const router = require('express').Router();
const eventController = require('../../controllers/eventController');
const auth = require('../../controllers/authController');

// // Matches with "/api/events"
router.route('/')
  .get(eventController.findAll)
  .post(auth.authorizeUserBody, eventController.create); // to protect in auth.authorizeUserBody

// // Matches with "/api/events/:id"
router.route('/:id')
  .get(eventController.findById)
  .put(auth.authorizeUserBody, eventController.update) // to protect in auth.authorizeUserBody
  .delete(auth.authorizeUserBody, eventController.remove); // to protect in auth.authorizeUserBody

router.route('/near/:latitude/:longitude')
  .get(eventController.findNear);


module.exports = router;
