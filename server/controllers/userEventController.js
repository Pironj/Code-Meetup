const db = require('../models');


module.exports = {

  findAll: function (req, res) {
    db.UserEvent
      .find({})
      .sort({ createdAt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByEventId: function (req, res) {
    db.UserEvent
      .find({event_id: req.params.event_id})
      .populate('user_id')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByUserId: function (req, res) {
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

  // addAttendee: (req, res) => {
  //   db.UserEvent.findByIdAndUpdate(req.params.id, { $push: { attendees: req.body.attendeeId } }, { new: true })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }

  // update: function(req, res) {
  //   db.UserEvent
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.UserEvent
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
