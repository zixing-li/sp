const mongoose = require('mongoose');
const { Schema } = mongoose;  // const Schema = mongoose.Schema;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], // array of RecipientSchema
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // specify relationship, every survey belongs to a specific user, ObjectId will be Id of the user, _underscore is a convention for relationship/reference field
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);