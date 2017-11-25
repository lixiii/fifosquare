/**
 * This module provides SMS functionality 
 */

var AWS = require('aws-sdk');

var sns = new AWS.SNS();

/**
 * 
 * @param {String} number 
 * @param {CallbackFunction} next - calls next(data). If errm calls next(null)
 */
exports.subscribe = function( number, next ) {
  var params = {
    Protocol: 'sms', /* required */
    TopicArn: 'arn:aws:sns:us-west-2:985071598136:fifosquare_notification', /* required */
    Endpoint: string(number)
  };
  sns.subscribe(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      next(null);
    }
    else  {
      // successful response
      next(data);
    }
  });
}

/**
 * 
 * @param {String} number 
 * @param {String} message 
 * @param {Function} next 
 */
exports.publish = function( number, message, next ){
  var params = {
    Message: message, /* required */
    MessageAttributes: {
      '<String>': {
        DataType: 'STRING_VALUE', /* required */
        BinaryValue: new Buffer('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
        StringValue: 'STRING_VALUE'
      },
      /* '<String>': ... */
    },
    MessageStructure: 'STRING_VALUE',
    PhoneNumber: 'STRING_VALUE',
    Subject: 'STRING_VALUE',
    TargetArn: 'STRING_VALUE',
    TopicArn: 'STRING_VALUE'
  };
  // set sender id
  sns.SMS.SenderID = "FIFO Square";

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