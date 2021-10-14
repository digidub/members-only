const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  membershipStatus: {
    type: String,
    default: 'unconfirmed',
    enum: ['unconfirmed', 'confirmed'],
  },
});

UserSchema.virtual('name').get(() => {
  return this.firstName + this.lastName;
});

module.exports = mongoose.model('User', UserSchema);
