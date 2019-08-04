const db = require('../models');


module.exports = {

  findAll: function (req, res) {
    db.Comment
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Comment
      .findById(req.params.id)
      .populate('creator')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findCommentsForEvent: (req, res) => {
    db.Comment.find({ event: req.params.eventId })
      .populate('creator')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findCommentsForUser: (req, res) => {
    db.Comment.find({ user: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {
    db.Comment
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  update: function(req, res) {
    db.Comment
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    db.Comment
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
