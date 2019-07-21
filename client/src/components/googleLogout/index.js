import React from 'react';
import { GoogleLogout } from 'react-google-login';
require("dotenv").config();

function Logout() {
  const logout = (response) => {
    console.log(response);
  }
  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>

  )
}

export default Logout