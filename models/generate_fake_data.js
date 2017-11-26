var generate = require('project-name-generator');
var Q = require("./Q");
var boothcontroller = require("./controllers/booth");
var masterBoothLedger = require("./masterBoothLedger");
var randomstring = require("randomstring");
var randnorm = require("randgen")


exports.fakeToday = function (io) {
  boothnames = [];
  for (var i=0; i<100; i++) {
    boothnames.push(generate().spaced);
  }

  boothnames.forEach(function(name){
    masterBoothLedger.push({boothname: name,  Q: new Q.Q(io)});
  });

  boothnames.forEach(function(fakename) {
    boothcontroller.enQ(fakename,
      generate().dashed,
      randomstring.generate({charset: "0123456789", length: 11}),
      Math.max(Math.ceil(randnorm.rnorm()*5)+10),0);
  });
}