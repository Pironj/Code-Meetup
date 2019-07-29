const db = require('../models');


module.exports = {

  findAll: function (req, res) {
    db.User
      .find({})
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: async function (req, res) {
    console.log('\n===== authObj =====\n', req.body);
    try {
      const createdUser = await db.User.create(req.body);
      return res.json(createdUser);
    } catch (err) {
      console.log('\n===== FAILED TO CREATE NEW USER =====\n', err, '\n\n');
      return res.json(err);
    }
  },

  update: function (req, res) {
    db.User
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.User
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
