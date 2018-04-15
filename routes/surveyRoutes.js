const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // get access to mongoose model class. Written this way to avoid errors in tests, therefore not use require('surveys')

module.exports = (app) => {
  // app.get('/api/surveys/thanks', (req, res) => {
  //   res.send('Thanks for voting!');
  // });
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({ // find _user will also return its recipients property, which will be a huge list, therefore we use select to filter the result to make the process faster
      recipients: false // do not include list of recipients
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  // app.post('/api/surveys/webhooks', (req, res) => {
  //   // console.log(req.body);
  //   // res.send({}); // close the request we don't don't keep sendgrid hanging
  //   const events = _.map(req.body, ({ email, url }) => {
  //     const p = new Path('/api/surveys/:surveyId/:choice');
  //     const pathname = new URL(url).pathname; // extract the path from the entire url

  //     console.log(p.test(pathname));
  //     const match = p.test(pathname);
  //     if (match) {
  //       return { email, surveyId: match.surveyId, choice: match.choice };
  //     }
  //   });
  // });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body) // chain actions
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId') // uniqueness check
      .each(({ surveyId, email, choice }) => {
        // don't need to add async await because sendgrid don't expect any checks or response
        Survey.updateOne( // Mongo takes care of searching for the one record that matches surveyId
          {
            _id: surveyId, // _id is how mongo stores id, so make sure to include the underscore
            recipients: { // look into recipients subdocument and find one element that matchs the given email and choice
              $elemMatch: { email: email, responded: false }
            }
          },
          { // after finding the record we want, Mongo will update the second argument (this object here):
            $inc: { [choice]: 1 }, // $inc is a mongo operator, stands for increment (+1). [choice] is not an arrary, it will be replaced by a key ('yes' or 'no') depending on what the key is and increment it by 1 
            $set: { 'recipients.$.responded': true }, // $set is another mongo operator. It's saying: in the survey that was found, look into the recipients subdocument. Inside the subdocument, there are a bunch of records. To make sure we only update the one we care about, we use the $, which lines up with $elemMatch from the query above. The query above was there to find just the subdocument collection recipient that matches the email and responded, eg. it could be at index 500, which is then placed at the $ sign in this line
            lastResponded: new Date()
          }
        ).exec(); // execute the updateOne query
      })
      .value();

    res.send({});
  });

  // this route accepts a post request
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => { // we can add in any number of functions in the request handler
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
    
    try {
      await mailer.send();
      // wait for the above is finished
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};