const router = require('express').Router();
const authController = require('../../controllers/authController');




// // Matches with "/api/users/:id/verify"
router.route('/verify')
  .get(authController.authorize)

router.route('/test')
  .get(authController.test);


module.exports = router;
