const router = require('express').Router();
const commentController = require('../../controllers/commentController');

// // Matches with "/api/books"
router.route('/')
  .get(commentController.findAll)
  .post(commentController.create);

// // Matches with "/api/books/:id"
router.route('/:id')
  .get(commentController.findById);
//   .put(commentController.update)
//   .delete(commentController.remove);

module.exports = router;
