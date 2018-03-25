const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User') // this has to come before importing passport
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// enabling cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
// use cookie
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; // env = environment variables. If no environment variable (Eg. local machine), use default - in this case 5000
app.listen(PORT);