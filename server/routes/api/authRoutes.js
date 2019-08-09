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

// For testing JWT in header
router.route('/protected/:id')
  .get(auth.authorizeUser, (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;

    if (authenticatedUser._id.toString() !== req.params.id) {
      return res.status(422).json({message: 'You are not authorized to perform this action'});
    }
    return res.json({message: 'I\'m protected!'});
  });

module.exports = router;
