const db = require('../models');


module.exports = {

  findAll: function (req, res) {
    db.UserEvent
      .find({})
      .sort({ createdAt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Find all users for an event id
  findUsersForEventId: function (req, res) {
    db.UserEvent
      .find({event_id: req.params.event_id})
      .populate('user_id')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Find all events for a user id
  findEventsForUserId: function (req, res) {
    db.UserEvent
      .find({user_id: req.params.user_id})
      .populate('event_id')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) { // Creates document with userid, event_id
    db.UserEvent
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: (req, res) => {
    db.UserEvent
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeById: (req, res) => {
    db.UserEvent
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    db.UserEvent
      .findOneAndDelete({ user_id: req.params.user_id, event_id: req.params.event_id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
