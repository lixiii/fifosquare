// io is the io object initialised in server.js
var awsController = require("../routes/aws")

function Q(io) {
  this.Q = [];
  this.QLength = 0;
  const notificationLength = 2;

  
  this.getLength = function() {
    var sum = 0;
    this.Q.forEach(function(element) {
      sum += element.groupsize;
    });
 
    return sum;
  };


  this.formatToday = function(d) {
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    return hr+":"+min;
  }


  this.enQ = function(user, phonenumber, groupsize) {
    var entry = {
      user: user,
      phonenumber: phonenumber,
      groupsize : groupsize,
      time: new Date(),
    }
    this.Q.push(entry);
    this.QLength = this.getLength();
    // io.sockets.emit("enQ", this.QLength);
    return this.QLength;
  };

  this.enQFake = function(user, phonenumber, groupsize, time) {
    var entry = {
      user: user,
      phonenumber: phonenumber,
      groupsize : groupsize,
      time: time,
    }
    this.Q.push(entry);
    this.QLength = this.getLength();
    // io.sockets.emit("enQ", this.QLength);
    return this.QLength;
  };


  this.deQ = function() {
    this.Q.pop();
    this.QLength = this.getLength();
    var num = [];
    var usr = [];
    if (this.QLength < notificationLength+1) {
      this.Q.forEach(entry => {
        num.push(entry.phonenumber);
        usr.push(entry.user);
      })
    } else {
      num.push(this.Q[notificationLength].phonenumber);
    }
    console.log("I Just sent a message!")
    num.forEach( (num, i) => {
      awsController.publish(num, `Hi ${usr[i]}, it is about your turn,  please proceed to the booth now. Thank you!`, function(data) {
        if (data !== null) {
          console.log('sent');
          console.log(data)
        }
      });
    }); 
    // io.sockets.emit("deQ", this.QLength);
    return this.QLength;
  };


  this.trend = function() {
    data_points = [];
    this.Q.forEach(element => {
      var entry = {
        time: this.formatToday(element.time),
        data: element.groupsize,
      }

      data_points.push(entry);
    })

    return data_points;
  };
}

exports.Q = Q;