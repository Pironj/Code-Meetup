import React from 'react';
import { GoogleLogin } from 'react-google-login';
import  API from '../../utils/API';
require("dotenv").config();
function Login() {

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


  // }

  // return (
  //   <GoogleLogin
  //     clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}

      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}



 

export default Login