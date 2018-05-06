// Work In Progress. Not yet integrated. 
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Post = mongoose.model('posts'); // get access to mongoose model class. Written this way to avoid errors in tests, therefore not use require('surveys')

module.exports = (app) => {
  app.get('/api/posts', requireLogin, async (req, res) => {
    const posts = await Post.find({ _user: req.user.id })

    res.send(posts);
  });

  // this route accepts a post request
  app.post('/api/posts', requireLogin, async (req, res) => { // we can add in any number of functions in the request handler
    const { title, body } = req.body; // pull (get access to) these properties that were passed along from express from req.body
    
    const post = new Post({ // create a survey instance
      title, // same as title: title,
      body,
      _user: req.user.id, // id generated from mongo
      dateSent: Date.now(),
    });

  });
};