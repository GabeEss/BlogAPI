require('dotenv').config();
const Poster = require('./models/poster');
var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
const jwt = require('jsonwebtoken');
var path = require('path');
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

const indexRouter = require('./routes/index');
const blogRouter = require("./routes/blog");

const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function() {
    console.log("MongoDB database connection established successfully");
  });
}

const sessionSecret = process.env.SESSION_SECRET;

app.use(cors({
  origin: 'https://gabe-ess-blog-api.netlify.app/', // replace with your frontend URL
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  sameSite: 'none',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
 }));

 // Will be called to authenticate user.
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Poster.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Poster.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve the React app
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use('/', indexRouter);
app.use("/blog", blogRouter);

// Add this before the catch-all route to validate user.
app.get('/blog/user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// Just in case we need to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error message
  res.status(err.status || 500);
  if (req.app.get('env') === 'development') {
    res.send({ message: err.message, error: err });
  } else {
    res.send({ message: err.message });
  }
});

module.exports = app;
