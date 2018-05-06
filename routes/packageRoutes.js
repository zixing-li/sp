const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Package = mongoose.model('packages'); // get access to mongoose model class. Written this way to avoid errors in tests, therefore not use require('surveys')

module.exports = (app) => {
  app.get('/api/packages', requireLogin, async (req, res) => {
    const packages = await Package.find({ _user: req.user.id })

    res.send(packages);
  });

  // this route accepts a Package request
  app.post('/api/packages', requireLogin, async (req, res) => { // we can add in any number of functions in the request handler
    const { title, body } = req.body; // pull (get access to) these properties that were passed along from express from req.body
    
    const package = new Package({ // create a survey instance
      title, // same as title: title,
      body,
      _user: req.user.id, // id generated from mongo
      dateCreated: Date.now(),
    });

  });
};