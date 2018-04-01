const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    // after authenticate is executed
    (req, res) => {
      res.redirect('/')
    }
  )

  app.get('/api/logout', (req, res) => {
    req.logout();
    // res.send(req.user); // verify that user no longer signed in. should display as an empty page because no user
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // test to make sure that someone who's gone through OAuth flow get access to the user
  });
};