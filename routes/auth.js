/**
 * Authentication module
 */

// Load required packages
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

passport.use('local', new LocalStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));

/**
 * @export
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(true);
}

/** 
 * @export
 */
exports.authenticate = passport.authenticate('local');

/**
 * middle-ware for checking authentication
 * @export
 */
exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.sendStatus(401);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}