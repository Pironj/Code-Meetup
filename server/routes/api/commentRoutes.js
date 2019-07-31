const router = require('express').Router();
const commentController = require('../../controllers/commentController');

// // Matches with "/api/books"
router.route('/')
  .get(commentController.findAll)
  .post(commentController.create); // to protect in auth.authorizeUserParams

// // Matches with "/api/books/:id"
router.route('/:id')
  .get(commentController.findById)
  .put(commentController.update) // to protect in auth.authorizeUserParams
  .delete(commentController.remove); // to protect in auth.authorizeUserParams

router.route('/user/:id')
  .get(commentController.findCommentsForUser);

router.route('/event/:id')
  .get(commentController.findCommentsForEvent);

module.exports = router;
