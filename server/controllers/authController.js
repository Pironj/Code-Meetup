const db = require('../models');
const axios = require('axios');
const createUser = require('./userController');

module.exports = {

  
  // AUTH ROUTE
  // Route to verify and create a user to our DB if not already present
  verifyLogin: function (req, res) {
    const jwt = req.headers.authorization.slice(7);
    // console.log(req.headers.authorization.slice(7));
    axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
      .then(res => {

        const authUser = res.data;
        console.log(authUser);
        const authObj = {
          google_id: authUser.sub,
          first_name: authUser.given_name,
          last_name: authUser.family_name,
          picture: authUser.picture,
          email: authUser.email,
          token: jwt
        }        
        // CHECK If THE USER IN DB
        // passing in our google authenticated token data response and checks their corresponding google_id & email is equal to a user in DB
        // If not else call our userController to create our authObj user data to our DB by passing it our authObj
        db.User
        .findOne({'google_id': authObj.google_id, 'email': authObj.email})
          .then((currentUser) => {
            if(currentUser) {
              console.log(
                '<=============== FOUND CURRENT USER IN DB ==============>\nCurrent user is:\n\n',
                currentUser,
                '\n========================================================\n\n'
              );
                            
            } else {              
              // console.log(authObj);
              createUser.create(authObj)
              }
          })
          .catch(err => {
            console.log('Did not find user in DB error: ', err);
          });
        })
        .catch(err => res.status(422).json(err));
        return res.redirect('/')  // axios.post({headers: {Authorization:`Bearer ${jwt}`}})

  },
};