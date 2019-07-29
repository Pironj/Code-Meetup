const db = require('../models');


module.exports = {

  findAll: function (req, res) {
    db.User
      .find({})
      .select('-password')
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .select('-password')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  update: function (req, res) {
    db.User
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select('-password')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.User
      .findByIdAndDelete(req.params.id)
      .select('-password')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
