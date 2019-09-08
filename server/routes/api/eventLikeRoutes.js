const router = require('express').Router();
const eventLikeController = require('../../controllers/eventLikeController');
const auth = require('../../controllers/authController');


// // Matches with "/api/userEvents"
router.route('/')
  .get(eventLikeController.findAllEventLikes)
  .post(auth.authorizeUser, eventLikeController.create);

router.route('/:id')
  .delete(auth.authorizeUser, eventLikeController.removeById);

router.route('/event/:event_id')
  .get(eventLikeController.findNumEventLikesForEvent);

router.route('/:user_id/:event_id')
  .get(eventLikeController.findByUserIdAndEventId)
  .delete (auth.authorizeUser, eventLikeController.removeByUserIdAndEventId);


module.exports = router;
