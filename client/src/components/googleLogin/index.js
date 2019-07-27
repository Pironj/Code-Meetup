import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import  API from '../../utils/API';
require("dotenv").config();

function Login() {
  
  const responseGoogle = async (response) => {

    console.log("Google Response: \n", response);
    console.log("Google Profile Object: \n", response.profileObj);
    // console.log(response.Zi.id_token);

    const userData = response.profileObj;
    const user = {
      google_id: userData.googleId,
      first_name: userData.givenName,
      last_name: userData.familyName,
      picture: userData.imageUrl,
      email: userData.email,
      token: response.Zi.id_token
     };
    //  localStorage.setItem('currentUser', JSON.stringify(`${user.token}`));
  
      // const userToken = JSON.parse(localStorage.getItem('currentUser'));
      // console.log(userToken);
      // console.log(JSON.parse(localStorage.getItem('currentUser')));

     console.log('\n\n<===================== USER DATA ======================>\n');

     console.log(user);
     console.log('\n========================================================\n\n')
    return await API.verifyLogin(user.token);
    
  }


  const logout = (response) => {
    console.log(response);
    // document.cookie = "loginSuccess=" + "expires=Thu, 01 Jan 1970 00:00:00 UTC" + "path=/";
    // const userToken = JSON.parse(localStorage.getItem('currentUser'));
    
    // localStorage.removeItem('currentUser');
    // console.log(userToken);
    
    return response;
    
    
  }

  return (
    <div>

      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        // onRequest={init}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout>
    </div>
  );
}



 

export default Login
