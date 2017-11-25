var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var boothRoutes = require("./routes/booth");


/**
 * Initialisation 
 */

// Connect to the Crowdculus MongoDB
mongoose.connect('mongodb://localhost:27017/crowdculus');
mongoose.Promise = Promise;

var app = express();
// add logging
app.use(morgan('tiny'))

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

initialisePassport(app);


/**
 * Routes
 */
var router = express.Router();
// Register all our routes with /api
app.use('/api', router);

router.post('/booth', boothRoutes.createBooth);
router.get('/booths', boothRoutes.getBooths);


// Serve static contents and Start the server
app.get("/*", function(req, res, next) {
  var uid = req.params.uid,
      path = req.params[0] ? req.params[0] : "index.html";
  //Development mode
  res.sendFile(path, { root: "public" });
  //next();
});
app.listen(80);



// helper functions to improve readability
function initialisePassport(app) {
  // initialise passport
  var session = require("express-session");
  var passport = require("passport");
  var expressSession = require("express-session");
  var Booth = require("./models/booth");
  // Use the passport package in our application
  app.use(
      expressSession({
          secret: "crowdculusSession",
          resave: true,
          saveUninitialized: false,
          cookie: {}
      })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // save passport sessions
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
      // where is this user.id going? Are we supposed to access this anywhere?
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      Booth.findById(id, function(err, user) {
          done(err, user);
      });
  });
}
