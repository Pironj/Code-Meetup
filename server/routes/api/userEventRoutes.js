const router = require('express').Router();
const userEventController = require('../../controllers/userEventController');

// // Matches with "/api/userEvents"
router.route('/')
  .get(userEventController.findAll)
  .post(userEventController.create);

router.route('/:id')
  .get(userEventController.findById)
  .delete(userEventController.removeById);

router.route('/user/:user_id')
  .get(userEventController.findEventsForUserId); // to protect in auth.authorizeUserParams

router.route('/event/:event_id')
  .get(userEventController.findUsersForEventId); // to protect in auth.authorizeUserParams

router.route('/:user_id/:event_id')
  .get(userEventController.findByUserAndEventId) // to protect in auth.authorizeUserParams
  .delete (userEventController.removeByUserAndEventId);


module.exports = router;
