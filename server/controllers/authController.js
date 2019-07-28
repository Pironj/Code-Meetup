const db = require('../models');
const axios = require('axios');
const createUser = require('./userController');

module.exports = {

  test: (req, res, next) => {
    console.log("\nAuthorization headers test:\n",req.headers.authorization)
    const jwt = req.headers.authorization.slice(7);
    axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
    .then(res => {
      console.log("\n RESPONSE TEST\n", res.data);
      if (res) {
        next();
      } else {
        return next({
          'type':'error',
          'httpCode':400,
          'message': {
            'errCode': 'e402',
            'text': 'Not name specified'
          }
        });
      }
      
    }).catch(err => {
      console.log("\n ERROR \n", err)
    })
    return res.json('protected')
  },


 // AUTH ROUTE
 // Route to verify and create a user to our DB if not already present
 authorize: function (req, res) {
   console.log("\n======= VERIFY LOGIN RESPONSE =======\n", res);
  //  console.log("\nRequest\n", req.body);
   const jwt = req.headers.authorization.slice(7);
   // console.log(req.headers.authorization.slice(7));
   axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
     .then((googleResponse) => {
        console.log("Checking for headers",googleResponse);
       const authUser = googleResponse.data;
       console.log("\n======== AUTHORIZED GOOGLE RESPONSE ========\n", authUser);
       const authObj = {
         google_id: authUser.sub,
         first_name: authUser.given_name,
         last_name: authUser.family_name,
         picture: authUser.picture,
         email: authUser.email,
         token: jwt
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
                return res.json(currentUser, authObj.token); // <- raises error. Need to send newcreated user to client
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