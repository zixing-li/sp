const mongoose = require("mongoose");
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const postSchema = new Schema({
  // title: { type: String, required: true },
  // link: String,
  // text: String,
  // isDeleted: { type: Boolean, default: false },
  // createdAt: { type: Date, default: Date.now },
  // _creator: { type: Schema.ObjectId, ref: 'User' },
  // _comments: [ { type: Schema.ObjectId, ref: 'Comment' } ] // when should I use underscore? what changes to make to other parts of the file?
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    // want to make sure deleting a user while retaining his posts
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        // want to make sure deleting a user while retaining his posts
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts", postSchema); // plural or singular?
