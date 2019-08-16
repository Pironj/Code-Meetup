const db = require('../models');


module.exports = {

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Array<User>}
   */
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
      .populate('creator', 'first_name last_name')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Find all events near the given latitude, longitude coordinates
   */
  findNear: (req, res) => {
    db.Event.aggregate(
      [
        {
          '$geoNear': {
            'near': {
              'type': 'Point',
              'coordinates': [
                parseFloat(req.params.longitude),
                parseFloat(req.params.latitude)
              ]
            },
            'distanceField': 'distance',
            'spherical': true,
            'maxDistance': 10000
          }
        }
      ],
      function (err, results) {
        if (err) {
          return res.json(err);
        }
        return res.json(results);
      }
    );
  },

  create: async function (req, res) {
    const authenticatedUser = res.locals.authenticatedUser;

    try {
      const body = req.body;
      const newEvent = {
        creator: authenticatedUser._id,
        title: body.title,
        description: body.description,
        date: body.date,
        location: body.location,
        street_address: body.street_address,
      };

      const createdEvent = await db.Event.create(newEvent);
      await db.UserEvent.create({ user_id: createdEvent.creator, event_id: createdEvent._id }); // Event creator will attend event
      return res.json(createdEvent);
    } catch (err) {
      return res.status(422).json(err);
    }
  },

  update: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;
    try {
      // Check if user is the event's original creator
      const event = await db.Event.findById(req.params.id);
      if (authenticatedUser._id.toString() !== event.creator.toString()) {
        return res.status(422).json({ message: 'You are not authorized to perform this action' });
      }
    } catch (err) {
      return res.json(err);
    }

    const body = req.body;
    const existingEvent = {
      creator: authenticatedUser._id,
      title: body.title,
      description: body.description,
      date: body.date,
      location: body.location,
      street_address: body.street_address,
    };

    db.Event
      .findOneAndUpdate({ _id: req.params.id }, existingEvent, { new: true })
      .then(dbModel => {
        if (!dbModel) { // Check if event exists
          return res.status(404).json({ message: `Event with id ${req.params.id} does not exist.` });
        }
        return res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  remove: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;
    try {
      // Check if user is the event's original creator
      const event = await db.Event.findById(req.params.id);
      if (authenticatedUser._id.toString() !== event.creator.toString()) {
        return res.status(422).json({ message: 'You are not authorized to perform this action' });
      }
    } catch (err) {
      return res.status(404).json(err);
    }

    db.Event
      .findByIdAndDelete(req.params.id)
      .then(async dbModel => {
        if (!dbModel) { // Check if event exists
          return res.status(404).json({ message: `Event with id ${req.params.id} does not exist.` });
        }
        await db.UserEvent.deleteMany({ event_id: dbModel._id }); // Delete all UserEvent documents for the deleted event
        return res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
