const router = require('express').Router();
const passport = require('passport');
// const app = express();
require('../../config/passport');

// auth login
// router.get('/login', (req, res) => {
//   res.render('login', { user: req.user });
// });

// logout
router.get('/logout', (req, res) => {
  // handle with passport
  console.log('User logged out\n\n\n');
  req.session = null;
  req.logout();
  return res.redirect(req.rawListeners[11]);
});
// auth with google+
router.get('/auth', (req, res, next) => {
  console.log("RETURN TO VALUE: ", req.headers.referer);
  const { returnTo, hash } = req.headers.referer;
  const state = returnTo || hash
  ? Buffer.from(JSON.stringify({ returnTo, hash })).toString('base64') : undefined;
  const authenticator = passport.authenticate('google', { scope: ['profile', 'email'], state })
  authenticator(req, res, next)
});



// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/auth/callback', 
passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
  console.log("===== USER OBJECT FROM PASSPORT ======\n");
  // console.log(req.user);
  try {
    const { state } = req.query;
    // console.log('STATE: ', state);
    const { returnTo } = JSON.parse(Buffer.from(state, 'base64').toString());
    if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
      return res.redirect(returnTo)
    }
  } catch {

  }
  res.redirect('/')
  // if (req.user || req.session.user)
  //     return res.redirect('/' + req.user._id || req.session.user._id);
  // return res.redirect('/login');
});

module.exports = router;
