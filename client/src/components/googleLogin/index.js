// // import React from 'react';
// // import { GoogleLogin } from 'react-google-login';
// // require("dotenv").config();
// // function Login() {
//   const responseGoogle = (response) => {
//     console.log("Google Response: \n", response);
//     console.log("Google Profile Object: \n", response.profileObj);
//     console.log(response.Zi.id_token);

//     const userData = response.profileObj;
//     const googleDBId = userData.googleId;
//     const user = {
//       google_id: userData.googleId,
//       first_name: userData.givenName,
//       last_name: userData.familyName,
//       picture: userData.imageURL,
//       email: userData.email,
//       token: response.Zi.id_token
//      };
//      console.log('\n\n<===================== USER DATA ======================>\n');

//      console.log(user);
//      console.log('\n========================================================\n\n')

//   //  ====== TODO: HOOK UP TO BACKEND utils/API ======

//   //     // check if user already exists in our own db
//   //     User.findOne({ google_id: googleDBId })
//   //     .then((currentUser) => {
//   //       if(currentUser){
//   //         // already have this user
//   //         console.log(
//   //           '<=============== FOUND CURRENT USER IN DB ==============>\nCurrent user is:\n\n',
//   //           currentUser._id,
//   //           '\n========================================================\n\n'
//   //           );
//   //             return ({
//   //               id: currentUser._id,
//   //               token: response.Zi.id_token
//   //             });
//   //       } else {
//   //         //create user in our db
//   //         const newUser = {
//   //           google_id: user.google_id,
//   //           first_name: user.first_name,
//   //           last_name: user.last_name,
//   //           picture: user.picture,
//   //           email: user.email
//   //         };
//   //         User.create(newUser)
//   //           .then(mongoResponse => {
//   //             console.log('created new user: ', mongoResponse);
//   //             return ({
//   //               id: newUser._id,
//   //               token: response.Zi.id_token
//   //             });
//   //           })
//   //           .catch(err => {
//   //             console.log('\nFAILED TO CREATE NEW USER: ', err, '\n\n');
//   //           });
//   //       }
//   //     })
//   //     .catch(err => {
//   //       console.log('Did not find user in DB error: ', err);
//   //     });

//   }

//   return (
//     <GoogleLogin
//       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}

// //       buttonText="Login"
// //       onSuccess={responseGoogle}
// //       onFailure={responseGoogle}
// //       cookiePolicy={'single_host_origin'}
// //     />
// //   );
// // }



 

// // export default Login
