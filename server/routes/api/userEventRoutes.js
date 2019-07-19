const router = require('express').Router();
const userEventController = require('../../controllers/userEventController');

// // Matches with "/api/userEvents"
router.route('/')
  .get(userEventController.findAll)
  .post(userEventController.create);

router.route('/user/:user_id')
  .get(userEventController.findEventsForUserId);

router.route('/event/:event_id')
  .get(userEventController.findUsersForEventId);

module.exports = router;
