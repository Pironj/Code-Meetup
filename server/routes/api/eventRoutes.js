const router = require('express').Router();
const eventController = require('../../controllers/eventController');

// // Matches with "/api/events"
router.route('/')
  .get(eventController.findAll)
  .post(eventController.create);

// // Matches with "/api/events/:id"
router.route('/:id')
  .get(eventController.findById)
  .put(eventController.update)
  .delete(eventController.remove);

router.route('/near/:latitude/:longitude')
  .get(eventController.findNear);


module.exports = router;
