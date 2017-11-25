// io is the io object initialised in server.js
function Q(io) {
  this.Q = [];
  this.QLength = 0;

  this.enQ = function(user, phonenumber, groupsize) {
    var entry = {
      user: user,
      phonenumber: phonenumber,
      groupsize : groupsize,
      time: new Date(),
    }
    this.Q.push(entry);
    this.QLength = this.Q.length;
    io.sockets.emit("enQ", this.QLength);
    return this.QLength;
  };

  this.deQ = function() {
    var removed = this.Q.pop();
    this.QLength = this.Q.length;
    io.sockets.emit("deQ", this.QLength);
    return this.QLength;
  };

}

exports.Q = Q;