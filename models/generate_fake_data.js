var generate = require('project-name-generator');
var Q = require("./Q");
var boothcontroller = require("./controllers/booth");
var masterBoothLedger = require("./masterBoothLedger");
var randomstring = require("randomstring");


exports.fakeToday() = function (io) {
  boothnames = [];
  for (let i=0; i<200; i++) {
    boothnames.push(generate.spaced());
  }

  boothnames.forEach(function(name){
    masterBoothLedger.push({boothname: name,  Q: new Q.Q(io)});
  });

  boothnames.forEach(function(fakename) {
    boothcontroller.enQ(fakename,
      generate.dashed(),
      randomString.genearte({charset: "0123456789", length: 11}),
      Math.ceil(rnorm()*5));
  });
}