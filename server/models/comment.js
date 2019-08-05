const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true // Assigns createdAt and updatedAt fields
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
