const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const pointSchema = require('./point');

const saltRounds = 12;

const userSchema = new Schema(
  {
    google_id: {
      type: String,
      unique: true,
      required: false,
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
    password: { // Encrypted using bcrypt
      type: String,
      required: true,
      select: false,
      minlength: 3,
      maxlength: 255,
      trim: true,
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

userSchema.pre("save", async function (next) {
  try {
    // Hash password on save document
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  } catch (error) {
    return error;
  }
};


userSchema.virtual('events', {
  ref: 'UserEvent',
  localField: '_id',
  foreignField: 'user_id'
});


const User = mongoose.model('User', userSchema);

module.exports = User;
