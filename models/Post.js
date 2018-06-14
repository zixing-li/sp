const mongoose = require("mongoose");
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories"
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
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
  // category: {
  //   type: String
  // }
});

module.exports = Post = mongoose.model("posts", postSchema);
