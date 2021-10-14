const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  body: { type: String, required: true, minLength: 10, maxLength: 560 },
  timestamp: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Message', MessageSchema);
