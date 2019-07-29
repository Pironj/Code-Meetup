const router = require('express').Router();
const auth = require('../../controllers/authController');


router.route('/validate')
  .post(auth.validateJWT, (req, res) => {
    res.json({ message: 'token is valid' });
  });

router.route('/signup')
  .post(auth.signup);

router.route('/login')
  .post(auth.login);

// For testing
router.route('/protected/:id')
  .get(auth.authorizeUserParams, auth.protected);

module.exports = router;
