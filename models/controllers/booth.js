/**
 * BoothController
 */

 var Booth = require("../booth");
 var Q = require("../Q")
 var masterBoothLedger = require("../masterBoothLedger");

 exports.initialiseLedger = function( emptyLedger, io ) {
   // find all booths
    Booth.find(function (err, booths) {
      if (err)
        return console.log(err)

      booths.forEach(booth => {
        emptyLedger.push( {
          boothname: booth.boothname,
          Q: new Q.Q(io)
        });
      });

    });
 }

 exports.enQ = function( boothname, user, phonenumber, groupsize ) {
  var i = masterBoothLedger.findIndex( x => x.boothname == boothname );
  if( i != -1)
    return masterBoothLedger[i].Q.enQ( user, phonenumber, groupsize );
  else
    return null;
 }

 exports.enQFake = function( boothname, user, phonenumber, groupsize, time ) {
  var i = masterBoothLedger.findIndex( x => x.boothname == boothname );
  if( i != -1)
    return masterBoothLedger[i].Q.enQFake( user, phonenumber, groupsize );
  else
    return null;
 }

 exports.deQ = function( boothname ) {
  var i = masterBoothLedger.findIndex( x => x.boothname == boothname );
  if( i != -1)
    return masterBoothLedger[i].Q.deQ();
  else
    return null;
 }