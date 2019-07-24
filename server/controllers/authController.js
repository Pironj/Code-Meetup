const db = require('../models');
const axios = require('axios');

module.exports = {

  
  // AUTH ROUTE
  // Route to verify and create a user to our DB if not already present
  verifyLogin: function (req, res) {
    const jwt = req.headers.authorization.slice(7);
    console.log(req.headers.authorization.slice(7));
    axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
      .then(res => {    
        const responseUrl = res.request.res.responseUrl.split('=');
        const tokenRes = responseUrl[1]
        // console.log(tokenRes);
        // checkToken(tokenRes);
        // console.log(res.data);
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
              
              // TODO re-route user to homepage to avoide 404 error
              
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
            // console.log()
          })
          .catch(err => res.status(422).json(err));
          
          return res.redirect('/')
  },


  // readCookie: function (req, res) {
  //   if (document.cookie({name: 'loginSuccess'})) {
  //     console.log(document.cookie('loginSuccess'));
      
  //   }
    // var nameEQ = name + "=";
    // var ca = document.cookie.split(";");
    // for (var i = 0; i < ca.length; i++) {
    //   var c = ca[i];
    //   while (c.charAt(0) === " ") c = c.substring(1, c.length);
    //   if (c.indexOf(nameEQ) === 0) {
    //     return c.substring(nameEQ.length, c.length);
    //   }
    // }
  //   return res.cookie(`signed`, 'rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
  // }
  
  
//   // Check to make sure header is not undefined, if so, return Forbidden (403)
//   checkToken: (req, res, jwt) => {
//     console.log("JWT HEADER TOKEN\n", jwt.req.headers.authorization);
//     console.log("\n======= HEADERS =======\n\n", req);
//     const header = jwt.req.headers.authorization;
    
//     if(typeof header !== 'undefined') {
//       // const bearer = header.split(' ');
//       // const token = bearer[1];
//       const token = jwt.req.headers.authorization.slice(7);
      
      
//       if (token === req) {
//         console.log("<============= TOKEN VERIFIED =============>")
//         return res.sendStatus(200)
//       }
//       // next();
//     } else {
//         //If header is undefined return Forbidden (403)
//         return res.sendStatus(403)
//     }
//   },

};

