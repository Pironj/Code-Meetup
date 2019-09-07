const router = require('express').Router();
const eventLikeController = require('../../controllers/eventLikeController');
const auth = require('../../controllers/authController');


// // Matches with "/api/userEvents"
router.route('/')
  .get(eventLikeController.findAllEventLikes)
  .post(auth.authorizeUser, eventLikeController.create); // to protect in auth.authorizeUserParams

router.route('/:id')
  .delete(auth.authorizeUser, eventLikeController.removeById); // to protect in auth.authorizeUserParams

router.route('/event/:event_id')
  .get(eventLikeController.findLikesForEventId);

router.route('/:user_id/:event_id')
  .delete(auth.authorizeUser, eventLikeController.removeByUserIdAndEventId);


module.exports = router;
