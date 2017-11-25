
// Load required packages
var User = require('../../models/user');
var adminhash = "75121A37174DF60D712581425E397A55CB5A4FC175121A37174DF60D712581425E397A55CB5A4FC1";
var authController = require('./auth');
var fs = require('fs')
const crypto = require('crypto');
/**
 * Create endpoint /api/users for POST
 * @export
 */
exports.createUser = function(req, res) {
  // validate email
  if(!validateEmail(req.body.email)) {
    return res.send(400, {message:"Email is invalid", errorcode:"EMAIL_INVALID"});
  }

  var hash = crypto.randomBytes(30).toString('hex');

  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    hash: hash,
    credit: 300
  });

  // delay execution to prevent brute force attacks
  process.nextTick(function(){
    User.findOne({ username: req.body.username }, function (err, user_found) {
        if (err) { return res.send(500).send(err);}

        // User already exists
        else if (user_found) { return res.status(400).send({message:"User already exists", errorcode:"USER_EXISTS"}); }
        else {
            user.save(function(err) {
              if (err)
                return res.status(500).send(err);

              req.login( user, ( err ) => console.log ( err ) );
              return res.json({ message: 'New user added to the database!' });
          });
        }
    });
  })
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  // Check admin hash
  if(req.body.adminhash !== adminhash) {
    console.log("Unauthorised attempt to get user list is detected");
    return res.send(401)
  }
  User.find(function(err, users) {
    if (err)
      return res.send(err);

    res.json(users);
  });
};

exports.getUser = function(req,res) {
  if(!req.isAuthenticated()) return res.sendStatus(401);
  User.findOne({ username: req.user.username }, function (err, user) {
    if(err) res.status(500).send(err);
    else res.json(user);
  });
}

// For admins only: HTTP POST at /api/changeuser
exports.changeUser = function(req,res) {
  if(req.user.type != "admin" && req.body.adminhash !== adminhash) return res.send(401);
  else {
    username = req.body.userchanged == undefined ? req.body.username:req.body.userchanged;
    User.update({username: username}, {type:req.body.type}, function(err, num, raw) {
      if (err)
        return res.send(500, err);
      var message = "user " + username + " updated to type " + req.body.type;
      res.json({ message: message, data:raw });
      console.log(message)
    });
  }
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
