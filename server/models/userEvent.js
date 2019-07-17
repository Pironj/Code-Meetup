const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
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

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
