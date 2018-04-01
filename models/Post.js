const mongoose = require('mongoose');
const { Schema } = mongoose;  // const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  votes: Number, // net, could be positive or negative
});

mongoose.model('posts', postSchema);