const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require('../models/user');
require("dotenv").config();

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
     callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log('\n<===== passport callback function fired =====>\n\n');
      console.log(profile);
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
      console.log(userData);
      // check if user already exists in our own db
      User.findOne({ google_Id: profile.id })
      .then((currentUser) => {
        if(currentUser){
          // already have this user
          console.log('user is: ', currentUser);
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
              return done;
            })
            .catch(err => {
              console.log('FAILED TO CREATE NEW USER: ', err);
            });
        }
      })
      .catch(err => {
        console.log('Did not find user in DB error: ', err);
      });

    })
);