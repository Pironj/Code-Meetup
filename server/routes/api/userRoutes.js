const router = require('express').Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
// // Matches with "/api/users"
router.route('/')
  .get(userController.findAll)
  .post(userController.create);
  
// .. Matches with "/api/users/:id/verify"
router.route('/verify')
  // .get(authController.verifyLogin)
  .get(authController.verifyLogin)
  .post(userController.create);
// // Matches with "/api/users/:id"
router.route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
