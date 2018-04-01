const mongoose = require('mongoose');
const { Schema } = mongoose;  // const Schema = mongoose.Schema;

// a subdocument collection of Survey.js
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema; // will import in Survey.js as subdocument