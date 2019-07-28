const router = require('express').Router();
const authController = require('../../controllers/authController');

<<<<<<< HEAD
// // Matches with "/api/auth/verify"
router.route('/verify')
  .get(authController.verifyLogin)
  .post(userController.create);
=======



// // Matches with "/api/users/:id/verify"
router.route('/verify')
  .get(authController.authorize)

router.route('/test')
  .get(authController.test);


module.exports = router;
>>>>>>> 466eb4ab707f1ca88901a632ffab4bb533edbf4f
