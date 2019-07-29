const jwt = require('jsonwebtoken');
const passport = require('passport');
const moment = require('moment');
const passportJWT = require('passport-jwt');
const User = require('../models/user');
// require('dotenv').config()
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../../.env') })
console.log(__dirname)
console.log(process.env.JWT_SECRET)
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from "jsonwebtoken";
// import * as passport from "passport";
// import * as moment from "moment";
// import { Strategy, ExtractJwt } from "passport-jwt";

// import { IUser, User } from "../models/user";
// import { Image } from '../models/image';
// import * as validate from '../validation/validation';
// import { ValidationError } from "joi";
// require('joi')

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = '123456'


authenticate = (callback) => {
  return passport.authenticate("jwt", { session: false, failWithError: true }, callback);
};

genToken = (user) => {
  const expiresInDays = 7;
  const expires = moment().utc().add({ days: 7 }).unix();
  const body = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  //Sign the JWT token and populate the payload with the user email and id
  const token = jwt.sign({ user: body }, JWT_SECRET, { expiresIn: String(expiresInDays) + 'd' });

  return {
    token,
    expires: moment.unix(expires).format(),
    user,
  };
}

class Auth {

  constructor() {
    this.authorizeUserParams = this.authorizeUserParams.bind(this)
    this.authorizeUser = this.authorizeUser.bind(this)
  }

  initialize() {
    passport.use("jwt", this.getStrategy());
    return passport.initialize();
  }

  protected(req, res) {
    return res.json("I'm protected!")
  }

  validateJWT(req, res, next) {
    return authenticate((err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        if (info.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
        } else {
          return res.status(401).json({ message: info.message });
        }
      }
      next();
    })
      (req, res, next);
  }

  authorizeUser(req, res, next) {
    return authenticate((err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        if (info.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
        } else {
          return res.status(401).json({ message: info.message });
        }
      }
      console.log(String(user._id))
      console.log(res.locals.userIdLocation)
      if (String(user._id) !== res.locals.userIdLocation) {
        return res.status(401).json({ message: "userId in request body does not match user id in JWT" });
      }
      return next()
    })(req, res, next);
  }

  authorizeUserBody(req, res, next) {
    res.locals.userIdLocation = req.body.userId;
    return this.authorizeUser(req, res, next);
  }

  authorizeUserParams(req, res, next) {
    res.locals.userIdLocation = req.params.userId;
    return this.authorizeUser(req, res, next);
  }


  // // Signup authentication
  async signup(req, res, next) {
    // const { error } = validate.validateCreateUser(req.body);
    // if (error) {
    //   return res.status(400).json(error.details[0]);
    // }

    try {
      // Determine if username or email already exists
      const result = await Promise.all(
        [
          User.findOne({ email: req.body.email }),
          User.findOne({ username: req.body.username }),
        ]
      );
      if (result[0] || result[1]) {
        return res.json({ message: "Username or email already exists." });
      } else {
        // Success. Create new user
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        const savedUser = await user.save();
        const populatedUser = await User.findById(savedUser._id)
        if (populatedUser) {
          const authSuccess = this.genToken(populatedUser);
          return res.json(authSuccess);
        }
        throw new Error(`User with id ${savedUser._id} does not exist`);
      }
    } catch (error) {
      return res.json(error);
    }
  }

  async login(req, res, next) {
    try {
      // const { error } = validate.validateAuthenticateUser(req.body);
      // if (error) {
      //   return res.status(400).json(error.details[0]);
      // }

      const user = await User.findOne({ "email": req.body.email })

      if (!user) throw new Error("User not found");

      const success = await user.isValidPassword(req.body.password);
      if (!success) throw new Error("Invalid password");


      const authSuccess = genToken(user);
      return res.status(200).json(authSuccess);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ "message": "Invalid credentials", "errors": err });
    }
  }

  getStrategy() {
    const params = {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    };

    return new passportJWT.Strategy(params, (req, payload, done) => {
      User.findOne({ "_id": payload.user._id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user === null) {
          return done(null, false, { message: "The user in the token was not found" });
        }

        return done(null, { _id: user._id, username: user.username });
      })
        .catch(err => {
          console.log('err', err);
        });
    });
  }
}

const auth = new Auth();
module.exports = auth;

















































// const db = require('../models');
// const axios = require('axios');
// const createUser = require('./userController');
// require('dotenv').config();
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// // REACT_APP_GOOGLE_CLIENT_ID
// // REACT_APP_GOOGLE_CLIENT_SECRET
// module.exports = {

//   test: (req, res, next) => {
//     console.log('\nAuthorization headers test:\n', req.headers.authorization);
//     const jwt = req.headers.authorization.slice(7);
//     // axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
//     //   .then(res => {
//     //     console.log('\n RESPONSE TEST\n', res.data);
//     //     if (res) {
//     //       next();
//     //     } else {
//     //       return next({
//     //         'type': 'error',
//     //         'httpCode': 400,
//     //         'message': {
//     //           'errCode': 'e402',
//     //           'text': 'Not name specified'
//     //         }
//     //       });
//     //     }

//     //   }).catch(err => {
//     //     console.log('\n ERROR \n', err);
//     //   });
//     // return res.json('protected');
//     async function verify() {
//       const ticket = await client.verifyIdToken({
//         idToken: jwt,
//         audience: client,  // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//       });
//       const payload = ticket.getPayload();
//       const userid = payload['sub'];
//       // If request specified a G Suite domain:
//       //const domain = payload['hd'];
//     }
//     verify()
//     .then(res => {
//       console.log(res.json)
//     })
//     .catch(console.error);
//   },

//   protected(req, res) {
//     return res.json("I'm protected!")
//   },

//   authenticate(token) {
//     return axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token);
//   },

//   authorizeUser(req, res, next) {
//     const jwt = req.headers.authorization.slice(7);
//     console.log(jwt)
//     // return authenticate(jwt)
//     axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
//       .then(res => {
//         console.log('\n RESPONSE TEST\n', res.data);
//         // if (res) {
//         //   next();
//         // } else {
//         //   return next({
//         //     'type': 'error',
//         //     'httpCode': 400,
//         //     'message': {
//         //       'errCode': 'e402',
//         //       'text': 'Not name specified'
//         //     }
//         //   });
//         // }
//         next();

//       }).catch(err => {
//         console.log('\n ERROR \n', err);
//         next();
//       });

//     //   if (err) {
//     //     return next(err);
//     //   }
//     //   if (!user) {
//     //     if (info.name === "TokenExpiredError") {
//     //       return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
//     //     } else {
//     //       return res.status(401).json({ message: info.message });
//     //     }
//     //   }
//     //   if (String(user._id) !== res.locals.userIdLocation) {
//     //     return res.status(401).json({ message: "userId in request body does not match user id in JWT" });
//     //   }
//     //   return next();

//     // })(req, res, next);
//   },

//   // authorizeUserBody = (req: Request, res: Response, next: NextFunction) => {
//   //     res.locals.userIdLocation = req.body.userId;
//   //     return this.authorizeUser(req, res, next);
//   //   }

//   // authorizeUserParams = (req: Request, res: Response, next: NextFunction) => {
//   //     res.locals.userIdLocation = req.params.userId;
//   //     return this.authorizeUser(req, res, next);
//   //   }


//   // AUTH ROUTE
//   // Route to verify and create a user to our DB if not already present
//   authorize: function (req, res) {
//     console.log('\n======= VERIFY LOGIN RESPONSE =======\n', res);
//     //  console.log("\nRequest\n", req.body);
//     const jwt = req.headers.authorization.slice(7);
//     // console.log(req.headers.authorization.slice(7));
//     axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + jwt)
//       .then((googleResponse) => {
//         console.log('Checking for headers', googleResponse);
//         const authUser = googleResponse.data;
//         console.log('\n======== AUTHORIZED GOOGLE RESPONSE ========\n', authUser);
//         const authObj = {
//           google_id: authUser.sub,
//           first_name: authUser.given_name,
//           last_name: authUser.family_name,
//           picture: authUser.picture,
//           email: authUser.email,
//           token: jwt
//         };
//         //  CHECK If THE USER IN DB
//         // passing in our google authenticated token data response and checks their corresponding google_id & email is equal to a user in DB
//         // If not else call our userController to create our authObj user data to our DB by passing it our authObj
//         db.User
//           .findOne({ 'google_id': authObj.google_id, 'email': authObj.email })
//           .then((currentUser) => {
//             if (currentUser) {
//               currentUser = authObj;
//               console.log(
//                 '\n<=============== FOUND CURRENT USER IN DB ==============>\nCurrent user is:\n\n',
//                 currentUser,
//                 '\n========================================================\n\n'
//               );
//               return res.json(currentUser);
//             } else {
//               // console.log(authObj);
//               createUser.create(authObj).then(currentUser => {
//                 // user = sendServerUser;
//                 console.log('CURRENT CREATED USER:', currentUser);
//                 // res.body = currentUser
//                 return res.json(currentUser, authObj.token); // <- raises error. Need to send newcreated user to client
//               })
//                 .catch(err => {
//                   console.log('\n====== HEADERS ERROR =======', err);
//                   return err;
//                 })
//                 .catch(err => {
//                   console.log('\n====== HEADERS ERROR =======', err);
//                   return err;
//                 });
//             }
//           })
//           .catch(err => {
//             console.log('Did not find user in DB error: ', err);
//             return err;
//           });
//         return googleResponse;
//       })
//       //  res.json(currentUser)
//       .catch(err => res.status(422).json(err));
//   },
// };