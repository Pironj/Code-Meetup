const db = require('../models');


module.exports = {

  findAllEventLikes: function (req, res) {
    db.EventLike
      .find({})
      .sort({ createdAt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Creates eventLike document with user_id, event_id
   */
  create: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;
    const eventId = req.body.event_id;

    try {
      const [event, eventLike] = await Promise.all(
        [
          db.Event.findById(eventId),
          db.EventLike.findOne({ user_id: authenticatedUser._id.toString(), event_id: eventId })
        ]
      );

      if (!event) { // Check if event exists
        return res.status(404).json({ message: `Event with id ${eventId} does not exist.` });
      }
      if (eventLike) {
        return res.status(400).json({ message: 'User already likes event' });
      }
    } catch (err) {
      return res.status(422).json(err);
    }
    // Both user and event exist. Proceed to create an EventLike
    const newEventLike = {
      user_id: authenticatedUser._id.toString(),
      event_id: eventId,
    };

    db.EventLike
      .create(newEventLike)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Find all likes for an event id
  findLikesForEventId: function (req, res) {
    db.EventLike
      .find({ event_id: req.params.event_id })
      .populate('user_id')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeById: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;

    try {
      const eventLike = await db.EventLike.findById(req.params.id);
      if (authenticatedUser._id.toString() !== eventLike.user_id.toString()) {
        return res.status(422).json({ message: 'You are not authorized to perform this action' });
      }
    } catch (err) {
      return res.status(422).json(err);
    }

    db.EventLike
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeByUserIdAndEventId: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;

    if (authenticatedUser._id.toString() !== req.params.user_id) {
      return res.status(422).json({ message: 'You are not authorized to perform this action' });
    }

    db.EventLike
      .findOneAndDelete({ user_id: req.params.user_id, event_id: req.params.event_id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
