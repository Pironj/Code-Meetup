const db = require('../models');


module.exports = {

  findAll: function (req, res) {
    db.User
      .find({})
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {
    console.log('authObj', req);
    db.User
      .create(req)
      .then(dbModel => {
        console.log('created new user: ', dbModel);
        return res.json(dbModel);
      })
      .catch(err => {
        console.log('\nFAILED TO CREATE NEW USER: ', err, '\n\n');
      });
    // .then(dbModel => res.json(dbModel))
    // .catch(err => res.status(422).json(err));
  },

  update: function (req, res) {
    db.User
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.User
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
