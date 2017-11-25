var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Booth = require('./models/booth');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));

var router = express.Router();

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(80);

var boothRoutes = require("./routes/booth");

router.route('/booth', boothRoutes.creatBooth);
