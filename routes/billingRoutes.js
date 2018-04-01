const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500, // need to say again on the backend
      currency: 'usd',
      description: '$5 payment',
      source: req.body.id // tok_......
    });

    req.user.credits += 5;
    const user = await req.user.save(); // save is an async request
    res.send(user);
  });
};