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
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: async function (req, res) {
    try {
      const user = await db.User.findById(req.body.creator); // Check if user exists
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
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        if (!dbModel) { // Check if event existed
          return res.status(404).json({ message: `Event with id ${req.params.id} does not exist.` })
        }
        return res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.Event
      .findByIdAndDelete(req.params.id)
      .then(async dbModel => {
        if (!dbModel) { // Check if event existed
          return res.status(404).json({ message: `Event with id ${req.params.id} does not exist.` })
        }
        await db.UserEvent.deleteMany({ event_id: dbModel._id }); // Delete all UserEvent documents for the deleted event
        return res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
