const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require('../models/user');
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: "http://localhost:4500/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log('passport callback function fired:');
      console.log(profile);
      // create a user object with user data returned from their google profile
      var userData = {
       google_id: profile.id,
       first_name: profile.displayName, // <===== TODO =====> splice the first name here
       last_name: profile.displayName, // <===== TODO =====> splice the last name here
       email: profile.emails[0].value,
       token: accessToken
      };
      console.log(userData);
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id })
      .then((currentUser) => {
        if(currentUser){
          // already have this user
          console.log('user is: ', currentUser);
        } else {
          //create user in our db
          new User({userData})
          .save().then((newUser) => {
            console.log('created new user: ', newUser);
            done(null, newUser);
          })
        }
      });

    })
);
