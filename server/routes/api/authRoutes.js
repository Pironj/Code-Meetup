const router = require('express').Router();
const passport = require('passport');

// auth login
// router.get('/login', (req, res) => {
//   res.render('login', { user: req.user });
// });

// auth with google+
router.get('http://localhost:4500/auth/google', passport.authenticate('google', { scope: ['profile'] })
);

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('http://localhost:4500/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  console.log("===== USER OBJECT FROM PASSPORT ======");
  console.log(req.user);
  res.redirect('/books');
});

module.exports = router;