const mongoose = require('mongoose');
const { Schema } = mongoose;  // const Schema = mongoose.Schema;

const packageSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  rating: Number,
  reviews: Number, // number of reviews
});

mongoose.model('packages', packageSchema);