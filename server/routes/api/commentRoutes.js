const router = require('express').Router();
const commentController = require('../../controllers/commentController');
const auth = require('../../controllers/authController');

// // Matches with "/api/books"
router.route('/')
  .get(commentController.findAll)
  .post(auth.authorizeUserBody, commentController.create); // to protect in auth.authorizeUserBody

// // Matches with "/api/books/:id"
router.route('/:id')
  .get(commentController.findById)
  .put(auth.authorizeUserBody, commentController.update) // to protect in auth.authorizeUserBody
  .delete(auth.authorizeUserBody, commentController.remove); // to protect in auth.authorizeUserBody

router.route('/user/:id')
  .get(commentController.findCommentsForUser);

router.route('/event/:eventId')
  .get(commentController.findCommentsForEvent);

module.exports = router;
