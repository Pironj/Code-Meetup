const db = require('../models');
const axios = require('axios');
const createUser = require('./userController');

module.exports = {


 // AUTH ROUTE
 // Route to verify and create a user to our DB if not already present
 verifyLogin: function (req, res) {
   console.log("\n======= VERIFY LOGIN RESPONSE =======\n", res);
  //  console.log("\nRequest\n", req.body);
   const jwt = req.headers.authorization.slice(7);
   // console.log(req.headers.authorization.slice(7));
   axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
     .then((googleResponse) => {
        // console.log("Checking for headers",googleResponse);
       const authUser = googleResponse.data;
       console.log("\n======== AUTHORIZED GOOGLE RESPONSE ========\n", authUser);
       const authObj = {
         google_id: authUser.sub,
         first_name: authUser.given_name,
         last_name: authUser.family_name,
         picture: authUser.picture,
         email: authUser.email,
         token: authUser.jti
       };
      //  CHECK If THE USER IN DB
       // passing in our google authenticated token data response and checks their corresponding google_id & email is equal to a user in DB
       // If not else call our userController to create our authObj user data to our DB by passing it our authObj
       db.User
         .findOne({ 'google_id': authObj.google_id, 'email': authObj.email })
         .then((currentUser) => {
           if (currentUser) {
             currentUser = authObj;
             console.log(
               '\n<=============== FOUND CURRENT USER IN DB ==============>\nCurrent user is:\n\n',
               currentUser,
               '\n========================================================\n\n'
               );
              return res.json(currentUser)
            } else {
              // console.log(authObj);
              createUser.create(authObj).then(currentUser => {
                // user = sendServerUser;
                console.log("CURRENT CREATED USER:", currentUser);
                // res.body = currentUser
                return res.json(currentUser); // <- raises error. Need to send newcreated user to client
              })
              .catch(err => {
                console.log("\n====== HEADERS ERROR =======",err)
                return err;
              })
            }
          })
          .catch(err => {
            console.log('Did not find user in DB error: ', err);
            return err;
          });
      return googleResponse;
     })
    //  res.json(currentUser)
     .catch(err => res.status(422).json(err));
    },
  };