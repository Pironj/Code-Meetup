const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
//require passport for authentication
require('./server/config/passport');

const app = express();
const PORT = process.env.PORT || 4500;

// Require cookie packages
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

// Set up session cookies
app.use(
  cookieSession({
    name: "session", // key name for our cookie to reference later for our logged in user foreign id
    keys: ["123"], // key encryption
    // maxAge: 24 * 60 * 60 * 1000, //encrypt cookie make sure it is a day long
  })
);
app.use(cookieParser()); // Lets us easily get cookie data as request

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost/codemeetup';

// Define middleware here
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

  
// Add routes, both API and view
const routes = require('./server/routes');
const authRoutes = require('./server/routes/api/authRoutes');
app.use(routes);
app.use('/auth', authRoutes);


// Connect to the Mongo DB
mongoose.connect(mongodbUrl,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;
