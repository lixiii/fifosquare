/**
 * This module provides SMS functionality 
 */

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./awsCredentials.json');
var sns = new AWS.SNS();

/**
 * 
 * @param {String} number 
 * @param {String} message 
 * @param {Function} next 
 */
exports.publish = function( number, message, next ){
  var params = {
    Message: message, /* required */
    PhoneNumber: String(number),
  };

  sns.publish(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      next(null);
    }
    else     {
      console.log(data);           // successful response
      next(data)
    }
  });
}


exports.initAttributes = function (next) {
  var params = {
    attributes: { /* required */
      'DefaultSenderID': 'FIFO_Square'
    }
  };
  sns.setSMSAttributes(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      next(null);
    }
    else     {
      console.log(data);           // successful response
      next(data)
    }
  });
}