const mongoose = require('mongoose');
const {
  Schema
} = mongoose; // const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0
  },

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

// mongoose.model('users', userSchema);
module.exports = User = mongoose.model('users', userSchema);