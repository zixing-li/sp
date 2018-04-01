const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // get access to mongoose model class. Written this way to avoid erros in tests, therefore not use require('surveys')

module.exports = (app) => {
  app.post('/api/surveys/post', requireLogin, requireCredits, (req, res) => { // we can add in any number of functions in the request handler
    const { title, subject, body, recipients } = req.body; // pull (get access to) these properties that were passed along from express from req.body
    
    const survey = new Survey({ // create a survey instance
      title, // same as title: title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), // email will be a string with emails separated with commas, we turn it into array of objects
      // dont need to add the responded property because it has a default value
      _user: req.user.id, // id generated from mongo
      dateSent: Date.now(),
    });

    // send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};