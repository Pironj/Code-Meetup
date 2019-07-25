const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = require('./point');

const userSchema = new Schema(
  {
    google_id: {
      type: String,
      unique: true,
      required: true,
      select: false,
    },
    first_name: {
      type: String,
      required: false
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    location: {
      type: pointSchema,
      required: false
    }
  },
  {
    timestamps: true // Assigns createdAt and updatedAt fields
  }
);

userSchema.virtual('events', {
  ref: 'UserEvent',
  localField: '_id',
  foreignField: 'user_id'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
