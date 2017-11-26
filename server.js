var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/**
 * Initialisation 
 */
// add logging
app.use(morgan('tiny'))
initialisePassport(app);
// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Connect to the Crowdculus MongoDB
mongoose.connect('mongodb://localhost:27017/crowdculus');
mongoose.Promise = Promise;

// record of all the event booths and instances of the Qs
var boothController = require("./models/controllers/booth");
var masterBoothLedger = require("./models/masterBoothLedger");
boothController.initialiseLedger( masterBoothLedger, io );



/**
 * Routes
 */
var router = express.Router();
var boothRoutes = require("./routes/booth");
var QRoutes = require("./routes/Q");
// Register all our routes with /api
app.use('/api', router);

router.post('/booth', boothRoutes.createBooth);
router.post('/booth/login', boothRoutes.login);
router.get('booth/success', boothRoutes.success);
router.get('/booth/fail', boothRoutes.fail);
router.get('/booths', boothRoutes.getBooths);
router.get("/fakeboothdata", boothRoutes.fakeBoothData);

router.put('/queue', QRoutes.enQ);
router.delete('/queue', QRoutes.deQ);

router.get("/allqlength", QRoutes.getAllQLength);
router.post("/trend", QRoutes.getTrend);



// Serve static contents and Start the server
app.get("/*", function(req, res, next) {
  var uid = req.params.uid,
      path = req.params[0] ? req.params[0] : "customer_view.html";
  //Development mode
  res.sendFile(path, { root: "public" });
  //next();
});

server.listen(80);

// helper functions to improve readability
function initialisePassport(app) {
  // initialise passport
  var session = require("express-session");
  var passport = require("passport");
  var localStrategy = require("passport-local");
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

  passport.use(new localStrategy(Booth.authenticate()));
  passport.serializeUser(Booth.serializeUser());
  passport.deserializeUser(Booth.deserializeUser());
}

  // generate some fake data for today's presentation
  var fakedata = require("./models/generate_fake_data");
  fakedata.fakeToday(io);