const passport = require('passport');
const asyncHandler = require("express-async-handler");

// Display poster login form on GET.
exports.poster_login_get = asyncHandler(async (req, res, next) => {
  res.render("poster_login", { title: "Blog Poster Login", c_user: req.user })
});

// Handle poster login on POST.
exports.poster_login_post = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed
      const errorMessage = 'Incorrect username or password';
      return res.render('poster_login', { title: 'Blog Poster Login', c_user: req.user, errorMessage: errorMessage });
    }
    // Authentication successful, log in the user
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      // Redirect to the home page or another success page
      return res.redirect('/');
    });
  })(req, res, next);
});

// Handle poster logout on GET.
exports.poster_logout_get = asyncHandler(async (req, res, next) => {
  // Using req.logout with a callback function
  req.logout((err) => {
    if (err) {
        return next(err);
    }
    res.redirect("/");
  });
});
