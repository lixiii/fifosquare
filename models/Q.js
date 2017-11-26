// io is the io object initialised in server.js
function Q(io) {
  this.Q = [];
  this.QLength = 0;

  
  this.getLength = function() {
    var sum = 0;
    this.Q.forEach(function(element) {
      sum += element.groupsize;
    });s
 
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
    io.sockets.emit("enQ", this.QLength);
    return this.QLength;
  };


  this.deQ = function() {
    this.Q.pop();
    tthis.QLength = this.getLength();
    io.sockets.emit("deQ", this.QLength);
    return this.QLength;
  };


  this.trend = function() {
    data_points = [];
    this.Q.forEach(function(element){
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