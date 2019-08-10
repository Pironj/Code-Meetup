const db = require('../models');


module.exports = {

  findAll: function (req, res) {
    db.Comment
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Comment
      .findById(req.params.id)
      .populate('creator')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findCommentsForEvent: (req, res) => {
    db.Comment.find({ event: req.params.eventId })
      .populate('creator')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findCommentsForUser: (req, res) => {
    db.Comment.find({ user: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;

    try {
      const event = await db.Event.findById(req.body.eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event does not exist' });
      }
    } catch (err) {
      return res.status(422).json(err);
    }

    const body = req.body;
    const newComment = {
      creator: authenticatedUser._id,
      event: body.eventId,
      body: body.body,
    };

    db.Comment
      .create(newComment)
      .then(async savedComment => {
        const populatedComment = await db.Comment.findById(savedComment._id).populate('creator');
        return res.json(populatedComment);
      })
      .catch(err => res.status(422).json(err));
  },

  update: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;

    try {
      const foundComment = await db.Comment.findById(req.params.id);
      if (authenticatedUser._id.toString() !== foundComment.creator.toString()) {
        return res.status(422).json({ message: 'You are not authorized to perform this action' });
      }
    } catch (err) {
      return res.status(422).json(err);
    }

    const body = req.body;
    const updatedComment = {
      body: body.body,
    };

    db.Comment
      .findOneAndUpdate({ _id: req.params.id }, updatedComment, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: async (req, res) => {
    const authenticatedUser = res.locals.authenticatedUser;

    try {
      const foundComment = await db.Comment.findById(req.params.id);

      if (authenticatedUser._id.toString() !== foundComment.creator.toString()) {
        return res.status(422).json({ message: 'You are not authorized to perform this action' });
      }
    } catch (err) {
      return res.status(422).json(err);
    }

    db.Comment
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
