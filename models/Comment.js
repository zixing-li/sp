var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentSchema = new Schema({
	content: String,
	votes: Number
});

var Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;