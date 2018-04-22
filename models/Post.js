var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Comment = require('./Comment');

var postSchema = new Schema({
	title: String, 
	content: String, 
	thumbnail_image_url: String, 
	votes: Number,
	comments: [Comment.Schema] 
});

var Post = mongoose.model('posts', postSchema);

module.exports = postSchema;