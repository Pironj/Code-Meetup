


module.exports = {

  authChecker: function (req, res, next) {
    const userToken = JSON.parse(localStorage.getItem('currentUser'));
    if (userToken) {
      next();
    } else {
      res.redirect('/');
    }
  }

};







// Check to make sure header is not undefined, if so, return Forbidden (403)
// const checkToken = (req, res, jwt) => {
//   console.log("JWT HEADER TOKEN\n", jwt.req.headers.authorization);
//   console.log("\n======= HEADERS =======\n\n", req);
//   const header = jwt.req.headers.authorization;

//   if(typeof header !== 'undefined') {
//     // const bearer = header.split(' ');
//     // const token = bearer[1];
//     const token = jwt.req.headers.authorization.slice(7);


//     if (token === req) {
//       console.log("<============= TOKEN VERIFIED =============>")
//       return res.sendStatus(200)
//     }
//     // next();
//   } else {
//       //If header is undefined return Forbidden (403)
//       return res.sendStatus(403)
//   }
// }




// // middleware function for protected routes
// let checkToken = (req, res, next) => {
//   console.log('\n================ MIDDLEWARE FUNCTION ===============\n', req)
//   let token = req.headers.x-access-token || req.headers.authorization; // Express headers are auto converted to lowercase
//   console.log(token);
//   if (token.startsWith('Bearer ')) {
//     // Remove Bearer from string
//     token = token.slice(7, token.length);
//   }

//   if (token) {
//     jwt.verify(token, config.secret, (err, decoded) => {
//       console.log('========= TOKEN VERIFIED =========');
//       if (err) {
//         return res.json({
//           success: false,
//           message: 'Token is not valid'
//         });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.json({
//       success: false,
//       message: 'Auth token is not supplied'
//     });
//   }
// };
// const checkCookie = () => {
//   var userCookie = getCookie("loginSuccess");
//   console.log('USER COOKIE\n', userCookie);
//   if (userCookie != "" && userCookie === user.token) {
//    alert("Welcome again " + userCookie);
//   } else {
//     userCookie = alert("Not a valid user");
//     if (userCookie != "" && userCookie != null) {
//       setCookie("loginSuccess", userCookie , { expires: new Date(Date.now() + 900000), httpOnly: true });
//     }
//   }
// }

// module.exports = {
//   checkCookie: checkCookie
// }