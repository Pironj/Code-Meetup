const router = require('express').Router();
const auth = require('../../controllers/authController');


// router.route('/validate')
//   .post(auth.validateJWT, (req, res, next) => {
//     res.json({ message: 'token is valid' });
//   })


  router.route('/validate')
  .post(auth.validateJWT, (req, res, next) => {
    res.json({ message: 'token is valid' });
  })

router.route('/signup')
  .post(auth.signup)

router.route("/login")
  .post(auth.login);

// // Matches with "/api/users/:id/verify"
// router.route('/verify')
//   .get(authController.authorize);

// router.route('/test')
//   .get(authController.test);

router.route('/protected/:userId')
  .get(auth.authorizeUserParams, auth.protected);


module.exports = router;
