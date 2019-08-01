const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = require('./point');

const eventSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 10000,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: pointSchema,
      required: false,
    },
    street_address: {
      type: String,
      required: false,
      trim: true,
    }
  },
  {
    timestamps: true // Assigns createdAt and updatedAt fields
  }
);

eventSchema.set('toJSON', { virtuals: true });

eventSchema
  .virtual('dateFormatted')
  .get(function () {
    return moment(this.date).format('MMMM Do, YYYY, h:mm a');
  });

eventSchema.virtual('attendees', {
  ref: 'UserEvent',
  localField: '_id',
  foreignField: 'event_id'
});

eventSchema.index({ location: '2dsphere' });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
