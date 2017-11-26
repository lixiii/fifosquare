
var boothController = require("../models/controllers/booth");
var masterBoothLedger = require("../models/masterBoothLedger");

exports.enQ = function( req, res ) {
  var length = boothController.enQ( req.body.boothname, req.body.user, req.body.phonenumber, Number(req.body.groupsize) );
  if(length != null)
    res.send( {length: length} );
  else 
    res.sendStatus(400);
}

exports.deQ = function( req, res ) {
  var length = boothController.deQ( req.body.boothname );
  if(length != null)
    res.send( {length: length} );
  else 
    res.sendStatus(400);
}

exports.getAllQLength = function( req, res ) {

  var sorted = masterBoothLedger.map( x => {
    return { boothname: x.boothname, QLength: x.Q.QLength } 
  });
  
  sorted = sorted.sort( (a,b) => {
    if( a.QLength < b.QLength ) return 1;
    if( a.QLength > b.QLength ) return -1;
    return 0;
  } );

  res.json(sorted);

}