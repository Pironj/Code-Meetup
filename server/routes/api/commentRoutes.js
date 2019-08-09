const router = require('express').Router();
const commentController = require('../../controllers/commentController');
const auth = require('../../controllers/authController');

// // Matches with "/api/books"
router.route('/')
  .get(commentController.findAll)
  .post(auth.authorizeUser, commentController.create); // to protect in auth.authorizeUser

// // Matches with "/api/books/:id"
router.route('/:id')
  .get(commentController.findById)
  .put(auth.authorizeUser, commentController.update) // to protect in auth.authorizeUser
  .delete(auth.authorizeUser, commentController.remove); // to protect in auth.authorizeUser

router.route('/user/:id')
  .get(commentController.findCommentsForUser);

router.route('/event/:eventId')
  .get(commentController.findCommentsForEvent);

module.exports = router;
