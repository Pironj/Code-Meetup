const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const pointSchema = require('./point');

const SALT_ROUNDS = 12;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: { // Encrypted using bcrypt
      type: String,
      required: true,
      select: false,
      minlength: 4,
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

userSchema.set('toJSON', { virtuals: true });

userSchema.pre('save', async function (next) {
  try {
    // Hash password on save document
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
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

userSchema
  .virtual('full_name')
  .get(function () {
    return `${this.first_name} ${this.last_name}`;
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
