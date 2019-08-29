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

  // Find all events created by the user 
  findEventsCreatedForUserId: function (req, res) {
    db.UserEvent
      .find({ user_id: req.params.user_id })
      .populate('event_id')
      .then(dbModel => {
        const events = dbModel.filter(userEvent => {
          return userEvent.event_id.creator.toString() === req.params.user_id;
        });
        return res.json(events);
      })
      .catch(err => res.status(422).json(err));
  },

  // Find all events user is attending but did not create
  findEventsNotCreatedForUserId: function (req, res) {
    db.UserEvent
      .find({ user_id: req.params.user_id })
      .populate('event_id')
      .then(dbModel => {
        const events = dbModel.filter(userEvent => {
          return userEvent.event_id.creator.toString() !== req.params.user_id;
        });
        return res.json(events);
      })
      .catch(err => res.status(422).json(err));
  },

  /**
   * Creates UserEvent document with user_id, event_id
   */
  create: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;

    try {
      const [event, userEvent] = await Promise.all(
        [
          db.Event.findById(req.body.event_id),
          db.UserEvent.findOne({ user_id: authenticatedUser._id.toString(), event_id: req.body.event_id })
        ]
      );

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
    const newUserEvent = {
      user_id: authenticatedUser._id.toString(),
      event_id: req.body.event_id
    };

    db.UserEvent
      .create(newUserEvent)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: (req, res) => {
    db.UserEvent
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeById: async (req, res) => {
    // TODO prevent user from unattending an event they create

    const authenticatedUser = res.locals.authenticatedUser;

    try {
      const userEvent = await db.UserEvent.findById(req.params.id);
      if (authenticatedUser._id.toString() !== userEvent.user_id.toString()) {
        return res.status(422).json({ message: 'You are not authorized to perform this action' });
      }
    } catch (err) {
      return res.status(422).json(err);
    }

    db.UserEvent
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeByUserAndEventId: async (req, res) => {
    // TODO prevent user from unattending an event they create

    const authenticatedUser = res.locals.authenticatedUser;

    if (authenticatedUser._id.toString() !== req.params.user_id) {
      return res.status(422).json({ message: 'You are not authorized to perform this action' });
    }

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
