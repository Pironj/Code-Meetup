const router = require('express').Router();
const authController = require('../../controllers/authController');

// // Matches with "/api/auth/verify"
router.route('/verify')
  .get(authController.verifyLogin)
  .post(userController.create);