/**
 * A record of a user liking an event
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UserEvent is a record of a user attending an event
const eventLikeSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    }
  },
  {
    timestamps: true // Assigns createdAt and updatedAt fields
  }
);

const EventLike = mongoose.model('EventLike', eventLikeSchema);

module.exports = EventLike;
