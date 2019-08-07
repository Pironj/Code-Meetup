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
    try {
      const user = await db.User.findById(req.body.creator).select('-password'); // Check if user exists
      if (!user) {
        return res.status(404).json({ message: `User with id ${req.body.creator} does not exist.` });
      }

      const event = await db.Event.create(req.body);
      await db.UserEvent.create({ user_id: event.creator, event_id: event._id }); // Event creator will attend event
      return res.json(event);
    } catch (err) {
      return res.status(422).json(err);
    }
  },

  update: function (req, res) {
    db.Event
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => {
        if (!dbModel) { // Check if event exists
          return res.status(404).json({ message: `Event with id ${req.params.id} does not exist.` });
        }
        return res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
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
