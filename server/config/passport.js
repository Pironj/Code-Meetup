const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
require('dotenv').config();

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
  console.log(user.id);
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
      callbackURL: 'http://localhost:4500/auth/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log('\n<===== passport callback function fired =====>\n\n');
      console.log(profile);
      console.log('========================================================');
      console.log('========================================================');

      // console.log(email);
      // create a user object with user data returned from their google profile
      const userData = {
        google_id: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        picture: profile.photos[0].value,
        email: profile.emails[0].value,
        token: accessToken
      };
      console.log('\n\n<===================== USER DATA ======================>\n');

      console.log(userData);
      console.log('\n========================================================\n\n');
      // check if user already exists in our own db
      User.findOne({ google_id: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            console.log(userData.token);
            currentUser.token = userData.token;
            // already have this user
            console.log('<=============== FOUND CURRENT USER IN DB ==============>\nCurrent user is:\n\n', currentUser._id, '\n========================================================\n\n');
            return done(null, {
              id: currentUser._id,
              token: accessToken
            });
          } else {
            //create user in our db
            const newUser = {
              google_id: userData.google_id,
              first_name: userData.first_name,
              last_name: userData.last_name,
              picture: userData.picture,
              email: userData.email
            };
            User.create(newUser)
              .then(mongoResponse => {
                console.log('created new user: ', mongoResponse);
                return done(null, {
                  id: newUser._id,
                  token: accessToken
                });
              })
              .catch(err => {
                console.log('\nFAILED TO CREATE NEW USER: ', err, '\n\n');
              });
          }
        })
        .catch(err => {
          console.log('Did not find user in DB error: ', err);
        });

    })
);
