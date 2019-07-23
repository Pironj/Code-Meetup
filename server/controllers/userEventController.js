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
      .find({ event_id: req.params.event_id })
      .populate('user_id')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Find all events for a user id
  findEventsForUserId: function (req, res) {
    db.UserEvent
      .find({ user_id: req.params.user_id })
      .populate('event_id')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Creates document with user_id, event_id
   */
  create: async (req, res) => {
    try {
      const [user, event, userEvent] = await Promise.all(
        [
          db.User.findById(req.body.user_id),
          db.Event.findById(req.body.event_id),
          db.UserEvent.findOne({ user_id: req.params.user_id, event_id: req.params.event_id })
        ]
      );
      if (!user) { // Check if user exists
        return res.status(404).json({ message: `User with id ${req.body.user_id} does not exist.` });
      }
      if (!event) { // Check if event exists
        return res.status(404).json({ message: `Event with id ${req.body.event_id} does not exist.` });
      }
      if (userEvent) {
        return res.status(400).json({ message: 'User is already attending event' });
      }
    } catch (err) {
      return res.status(422).json(err);
    }
    // Both user and event exist. Proceed to create a UserEvent
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

  removeByUserAndEventId: function (req, res) {
    db.UserEvent
      .findOneAndDelete({ user_id: req.params.user_id, event_id: req.params.event_id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByUserAndEventId: (req, res) => {
    db.UserEvent
      .findOne({ user_id: req.params.user_id, event_id: req.params.event_id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
