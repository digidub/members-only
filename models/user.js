const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 24,
  },
  membershipStatus: {
    type: String,
    default: 'unconfirmed',
    enum: ['unconfirmed', 'confirmed'],
  },
});

module.exports = mongoose.model('User', UserSchema);
