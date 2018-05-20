const mongoose = require('mongoose');
const {
  Schema
} = mongoose; // const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // associate user by id
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: { // company or personsal
    type: String
  },
  location: {
    type: String
  },
  status: { // current job title
    type: String,
    required: true
  },
  skills: {
    type: [String], // array of strings, we take comma separated values and turn it into an array
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    // array of objects
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
        // not required because can choose current
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
      },
    }
  ],
  education: [
    // array of objects
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
        // not required because can choose current
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
      },
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
})

module.exports = Profile = mongoose.model('profiles', profileSchema)
// mongoose.model('profiles', profileSchema);