const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3002 : 4500);



const mongodbUrl = process.env.MONGODB_URI || (process.env.NODE_ENV === 'test' ? 'mongodb://localhost/testcodemeetup' : 'mongodb://localhost/codemeetup');

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
app.use(routes);


// Connect to the Mongo DB
mongoose.connect(mongodbUrl,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;
