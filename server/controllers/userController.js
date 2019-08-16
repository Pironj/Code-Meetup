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

  updateEmail: function (req, res) {
    const authenticatedUser = res.locals.authenticatedUser;

    if (authenticatedUser._id.toString() !== req.params.id) {
      return res.status(422).json({message: 'You are not authorized to perform this action'});
    }

    const body = req.body;
    const updatedUser = {
      email: body.email
    };
    db.User
      .findByIdAndUpdate(req.params.id, updatedUser, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    const authenticatedUser = res.locals.authenticatedUser;

    if (authenticatedUser._id.toString() !== req.params.id) {
      return res.status(422).json({message: 'You are not authorized to perform this action'});
    }

    db.User
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
