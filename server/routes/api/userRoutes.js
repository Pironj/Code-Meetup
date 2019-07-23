const router = require('express').Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
// // Matches with "/api/users"
router.route('/')
  .get(userController.findAll)
  .post(userController.create);

// // Matches with "/api/users/:id"
router.route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);
// .. Matches with "/api/users/:id/verify"
router.route('/:id/verify')
  .get(authController.verifyLogin, authController.checkToken)
  .post(userController.create);

module.exports = router;
