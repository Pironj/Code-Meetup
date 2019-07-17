const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEventSchema = new Schema(
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

const UserEvent = mongoose.model('UserEvent', userEventSchema);

module.exports = UserEvent;
