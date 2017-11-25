
var boothController = require("../models/controllers/booth");

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