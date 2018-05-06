// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema,
//     Comment = require('./Comment');

// var postSchema = new Schema({
// 	title: String, 
// 	content: String, 
// 	thumbnail_image_url: String, 
// 	votes: Number,
// 	comments: [Comment.Schema] 
// });

// var Post = mongoose.model('posts', postSchema);

// module.exports = postSchema;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  link: String,
  text: String,
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  _creator: { type: Schema.ObjectId, ref: 'User' },
  _comments: [ { type: Schema.ObjectId, ref: 'Comment' } ]
});

const Post = mongoose.model('Post', postSchema);
export default Post;