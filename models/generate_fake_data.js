var generate = require('project-name-generator');
var Q = require("./Q");
var boothcontroller = require("./controllers/booth");
var masterBoothLedger = require("./masterBoothLedger");
var randomstring = require("randomstring");
var randnorm = require("randgen")
var momentRandom = require('moment-random');

boothnames = [];
for (var i=0; i<100; i++) {
  boothnames.push(generate().spaced);
}

exports.fakeToday = function (io) {

  boothnames.forEach(function(name){
    masterBoothLedger.push({boothname: name,  Q: new Q.Q(io)});
  });

  boothnames.forEach(function(fakename) {
    var faketime = new Date();
    faketime.setHours(Math.min(Math.abs(Math.floor(randnorm.rnorm()*60)), 59));
    faketime.setMinutes(Math.min(Math.abs(Math.floor(randnorm.rnorm()*60)), 59));

    boothcontroller.enQFake(fakename,
      generate().dashed,
      randomstring.generate({charset: "0123456789", length: 11}),
      Math.max(Math.ceil(randnorm.rnorm()*3)+10, 0), 
      faketime);
  });
}

exports.fakeTable = function (io) {
  
  boothnames.forEach(function(fakename) {
    var faketime = new Date();
    faketime.setDate(Math.min(Math.abs(Math.floor(randnorm.rnorm()*30)), 29)) + 1;
    faketime.setHours(Math.min(Math.abs(Math.floor(randnorm.rnorm()*60)), 59));
    faketime.setMinutes(Math.min(Math.abs(Math.floor(randnorm.rnorm()*60)), 59));

    boothcontroller.enQFake(fakename,
      generate().dashed,
      randomstring.generate({charset: "0123456789", length: 11}),
      Math.max(Math.ceil(randnorm.rnorm()*3)+10, 0), 
      faketime);
  });
}