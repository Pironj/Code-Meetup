const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      required: false,
    },
    picture: {
      type: String,
      required: false,
    }
    // location: { // TODO
    //   type: pointSchema,
    //   required: true
    // }
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
