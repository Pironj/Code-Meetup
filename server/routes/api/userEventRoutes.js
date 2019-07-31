const router = require('express').Router();
const userEventController = require('../../controllers/userEventController');

// // Matches with "/api/userEvents"
router.route('/')
  .get(userEventController.findAll)
  .post(userEventController.create); // to protect in auth.authorizeUserParams

router.route('/:id')
  .get(userEventController.findById)
  .delete(userEventController.removeById); // to protect in auth.authorizeUserParams

router.route('/user/:user_id')
  .get(userEventController.findEventsForUserId); // to protect in auth.authorizeUserParams ?

router.route('/event/:event_id')
  .get(userEventController.findUsersForEventId);

router.route('/:user_id/:event_id')
  .get(userEventController.findByUserAndEventId) // to protect in auth.authorizeUserParams ?
  .delete (userEventController.removeByUserAndEventId); // to protect in auth.authorizeUserParams


module.exports = router;
