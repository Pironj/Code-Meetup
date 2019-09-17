// import React from 'react';
// import { GoogleLogout } from 'react-google-login';
// require("dotenv").config();

// function Logout() {


//   function signOut() {
//     const auth2 = window.gapi.auth2.getAuthInstance()
//     if (auth2 != null) {
//       auth2.signOut().then(
//         auth2.disconnect().then(this.props.onLogoutSuccess)
//       )
//     }
//   }

//   const forceMyOwnLogout = ((response) => {
//     document.cookie = "loginSuccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     if (window.gapi) {
//         const auth2 = window.gapi.auth2.getAuthInstance()
//         if (auth2 != null) {
//             auth2.signOut().then(
//                 auth2.disconnect().then(this.props.onLogoutSuccess)
//             )
//         }
//     }
//     this.forceUpdate()
// })
//   const logout = (response) => {
//     console.log(response);
//     document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     return response.redirect('/')


//   }
//   return (
//     <GoogleLogout
//       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//       buttonText="Logout"
//       onLogoutSuccess={logout}
//     >
//     </GoogleLogout>

//   )
// }

// export default Logout