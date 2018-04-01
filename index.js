const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // this has to come before importing passport
require('./models/Survery');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // any time a request (get, post, etc.) that has a request body that comes into our application, this middleware will parse the body and assign it to req.body property of the incoming request object

// enabling cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days max login
    keys: [keys.cookieKey]
  })
);
// use cookie
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // turns into a function and call the express app object
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production' ) {
  // Express will serve up production assets like our main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file if it doesn't recognize the route (if not in authRoutes, not in billingRoutes, not in build directory, then move on to ReactRouter)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000; // env = environment variables. If no environment variable (Eg. local machine), use default - in this case 5000
app.listen(PORT);