const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const auth = require('./server/controllers/authController');

const routes = require('./server/routes');

const app = express();

const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3002 : 3001);

const mongodbUrl = process.env.MONGODB_URI || (process.env.NODE_ENV === 'test' ? 'mongodb://localhost/testcodemeetup' : 'mongodb://localhost/codemeetup');

// Define middleware here
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(auth.initialize());

// Add routes, both API and view
app.use(routes);

// Serve up static assets for deployment (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Serve up static assets for development
const root = require('path').join(__dirname, 'client', 'build');
app.use(express.static(root));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

// Connect to the Mongo DB
mongoose.connect(mongodbUrl,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

console.log(PORT);
// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;
