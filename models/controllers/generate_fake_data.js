var generate = require('project-name-generator');
var Q = require("../Q");
var boothcontroller = require("booth");
var masterBoothLedger = require("../masterBoothLedger");
var randomstring = require("randomstring");

exports.weirdNames() = function() {
  boothnames = [];
  for (let i=0; i<200; i++) {
    boothnames.push(generate.spaced());
  }

  return boothnames;
}


exports.fakeToday() = function (io) {
  boothnames = weirdNames();

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