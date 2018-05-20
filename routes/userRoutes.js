const gravatar = require('gravatar');
const bcrypt = require('bcryptjs'); // hash the password
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport'); // to protect routes

// load input validation
const validateRegisterInput = require('../middlewares/validateRegister')
const validateLoginInput = require('../middlewares/validateLogin');

// const User = require('../models/User');
const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/api/users/test', (req, res) => res.json({
    msg: 'User Works'
  }));

  app.post('/api/users/register', (req, res) => {
    const {
      errors,
      isValid
    } = validateRegisterInput(req.body);
    // first-line validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    User.findOne({
      email: req.body.email
    }).then(user => { //"users" in the callback is the 'result' of the User.findOne().method call , if there is no user found it will use the req.body to create a new user.
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size
          r: 'pg', // rating
          d: 'mm', // default
        });
        const newUser = new User({ // create resource with Mongoose
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => { // generate salt with bcrypt and hash the password with the salt
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw (err);
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
  });

  app.post('/api/users/login', (req, res) => {
    const {
      errors,
      isValid
    } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({
        email
      }) // this will give a promise
      .then(user => {
        // check for user
        if (!user) {
          errors.email = 'User not found';
          return res.status(404).json(errors);
        }

        // check password
        bcrypt.compare(password, user.password) // will give a promise
          .then(isMatch => {
            if (isMatch) { // user passed, can generate token now
              // user matched
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              } // Create JWT Payload; can put whatever you want in the payload
              // sign token
              jwt.sign(
                payload,
                keys.secretOrKey, {
                  expiresIn: 360000 // 100 hours
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
            } else {
              errors.password = 'Password incorrect';
              return res.status(400).json(errors);
            }
          })
      });
  })

  app.get('/api/users/current/',
    passport.authenticate('jwt', {
      session: false
    }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      });
    }
  )
};