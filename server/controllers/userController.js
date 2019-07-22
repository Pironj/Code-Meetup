const db = require('../models');
const axios = require('axios');


module.exports = {

  findAll: function (req, res) {
    db.User
      .find({})
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  },

  // AUTH ROUTE
  // Route to verify and create a user to our DB if not already present
  verifyLogin: function (req, res) {
    const jwt = req.headers.authorization.slice(7);
    // console.log(req.headers.authorization.slice(7));
    axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
      .then(res => {
        console.log(res.data);
        const userInfo = res.data;
        const checkEmail = res.data.email;
        console.log('THIS IS YOUR EMAIL: ', checkEmail);
        // CHECK If THE USER IN DB
        // passing in our checkEmail varibale from our token data response and checks is User that logged in email is equal to a user in DB
        db.User
          .findOne({'email': checkEmail})
          .then((currentUser) => {
            if(currentUser) {
              console.log(
                '<=============== FOUND CURRENT USER IN DB ==============>\nCurrent user is:\n\n',
                currentUser,
                '\n========================================================\n\n'
              );
            } else {
              // creating a new user Object from token response that matches User Schema
              const newUser = {
                google_id: userInfo.sub,
                first_name: userInfo.given_name,
                last_name: userInfo.family_name,
                picture: userInfo.picture,
                email: checkEmail
              };
              // Create method to save the newUser object to our DB
              db.User
                .create(newUser)
                .then(mongoResponse => {
                  console.log('created new user: ', mongoResponse);
                  return newUser;
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
      .catch(err => res.status(422).json(err));

  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  update: function(req, res) {
    db.User
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    db.User
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
