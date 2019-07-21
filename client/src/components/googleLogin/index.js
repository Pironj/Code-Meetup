import React from 'react';
import { GoogleLogin } from 'react-google-login';
require("dotenv").config();
function Login() {

  const responseGoogle = (response) => {
    console.log(response);
  
  }
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}

      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}



 

export default Login