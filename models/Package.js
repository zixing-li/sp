const mongoose = require('mongoose');
const { Schema } = mongoose;  // const Schema = mongoose.Schema;

const packageSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  rating: Number,
  reviews: Number, // number of reviews
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // specify relationship, every survey belongs to a specific user, ObjectId will be Id of the user, _underscore is a convention for relationship/reference field
  buyers: [BuyerSchema], // array of RecipientSchema
});

mongoose.model('packages', packageSchema);