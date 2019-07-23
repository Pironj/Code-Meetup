import React from 'react';
import { GoogleLogin } from 'react-google-login';
import  API from '../../utils/API';
require("dotenv").config();
function Login() {

<<<<<<< HEAD
  // const responseGoogle = (response) => {
  //   console.log("Google Response: \n", response);
  //   console.log("Google Profile Object: \n", response.profileObj);
  //   console.log(response.Zi.id_token);

  //   const userData = response.profileObj;
  //   const googleDBId = userData.googleId;
  //   const user = {
  //     google_id: userData.googleId,
  //     first_name: userData.givenName,
  //     last_name: userData.familyName,
  //     picture: userData.imageURL,
  //     email: userData.email,
  //     token: response.Zi.id_token
  //    };
  //    console.log('\n\n<===================== USER DATA ======================>\n');

  //    console.log(user);
  //    console.log('\n========================================================\n\n')
=======
  const responseGoogle = (response) => {
    console.log("Google Response: \n", response);
    console.log("Google Profile Object: \n", response.profileObj);
    console.log(response.Zi.id_token);

    const userData = response.profileObj;
    const googleDBId = userData.googleId;
    const user = {
      google_id: userData.googleId,
      first_name: userData.givenName,
      last_name: userData.familyName,
      picture: userData.imageUrl,
      email: userData.email,
      token: response.Zi.id_token
     };
     console.log('\n\n<===================== USER DATA ======================>\n');

     console.log(user);
     console.log('\n========================================================\n\n')
     // hit API route to our backend passing in user token
     API.verifyLogin(user.google_id, user.token);
>>>>>>> 3bd8e008cfd7dbfcb8ee302dc9d4cf0be0dc82a9


  // }

<<<<<<< HEAD
  // return (
  //   <GoogleLogin
  //     clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
=======
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
>>>>>>> 3bd8e008cfd7dbfcb8ee302dc9d4cf0be0dc82a9

      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}



 

export default Login
