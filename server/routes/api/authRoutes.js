const router = require('express').Router();
const passport = require('passport');
require('../../config/passport');

// auth login
// router.get('/login', (req, res) => {
//   res.render('login', { user: req.user });
// });

// auth with google+
router.get('/auth/google/', passport.authenticate('google', { scope: ['profile', 'email'] })
);

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    console.log('User logged out\n\n\n');
    res.redirect('/');
});

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
 function (req, res, err) {
  if (err.name === 'TokenError') {
    console.log(res);
    console.log(err);
  }
  // res.send(req.user);
  console.log("===== USER OBJECT FROM PASSPORT ======\n");
  console.log(req.user);
  req.session.token = req.user.token; // Set session cookie to google user token
  req.session.userid = req.user.id;
    console.log(res);
    res.redirect('/');
});

module.exports = router;