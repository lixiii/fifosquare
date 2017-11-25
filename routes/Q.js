function Q() {
  this.Q = [];

  this.enQ = function(req, res) {
    var entry = {
      user: req.body.user,
      time: new Date(),
    }
    this.Q.push(entry);
  };

  this.deQ = function(req, res) {
    var removed = Q.pop();
  };
}

exports.Q = Q;