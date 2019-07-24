import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import  API from '../../utils/API';
// import { gapi } from 'gapi-script';
require("dotenv").config();

function Login() {

  // function init() {
  //   gapi.load('auth2', function() {
  //     gapi.auth2.init()
  //     /* Ready. Make a call to gapi.auth2.init or some other API */
  //   });
  // }

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
     document.cookie = "loginSuccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
     document.cookie = "loginSuccess=" + user.token + ";" + "path=/;";
    //  document.cookie = "loginSuccess=" + user.token + "path=/";
    console.log("THIS IS MY COOKIE", document.cookie);
    readCookie();
    API.verifyLogin(user.token);
    
    
  }
  const logout = () => {
    document.cookie = "loginSuccess=" + "expires=Thu, 01 Jan 1970 00:00:00 UTC" + "path=/";
    
    
    console.log();
    // return response.redirect('/')
    
    
  }
  
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
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
