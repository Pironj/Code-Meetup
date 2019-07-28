const router = require('express').Router();
const auth = require('../../controllers/authController');


router.route('/validate')
  .post(auth.validateJWT, (req, res, next) => {
    res.json({ message: 'token is valid' });
  })

router.route('/signup')
  .post(auth.signup)

router.route("/login")
  .post(auth.login);

module.exports = router;
