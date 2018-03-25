const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { 
  done(null, user.id) // user.id is the mongodb id assigned by mongo
});

passport.deserializeUser((id, done) => { // turn user id into a user
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, 
  // (accessToken, refreshToken, profile, done) => {
  //   // console.log('access token', accessToken);
  //   // console.log('refresh token', refreshToken);
  //   // console.log('profile:', profile);
  //   User.findOne({ googleID: profile.id }).then((existingUser)=>{
  //     if (existingUser) {
  //       // we already have a record with the given profile ID
  //       done(null, existingUser);
  //     } else {
  //       // we don't have a record with this Id, create a new record
  //       new User({ googleID: profile.id })
  //       .save()
  //       .then(user => done(null, user));
  //     }
  //   })
  // }
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id })
    if (existingUser) {
      done(null, existingUser); // we already have a record with the given profile ID
    } else {
      const user = await new User({ googleID: profile.id }).save()  // we don't have a record with this Id, create a new record
      done(null, user);
    }
  }
  )
);