const db = require('../models');


module.exports = {

  findAll: function (req, res) {
    db.Event
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Event
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: async function (req, res) {
    try {
      const event = await db.Event.create(req.body);
      await db.UserEvent.create({user_id: event.creator, event_id: event._id}); // Event creator will attend event
      return res.json(event);
    } catch (err) {
      return res.status(422).json(err);
    }
  },

  update: function (req, res) {
    db.Event
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.Event
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
