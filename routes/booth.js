// Load required packages
var Booth = require('../models/booth');
const crypto = require('crypto');
/**
 * Create endpoint /api/booth for POST
 * @export
 */
exports.createBooth = function (req, res) {
  // validate email
  if (!validateEmail(req.body.email)) {
    return res.send(400, { message: "Email is invalid.", errorcode: "EMAIL_INVALID" });
  }

  var booth = new Booth({
    boothname: req.body.boothname,
    password: req.body.password,
    email: req.body.email
  });

  // delay execution to prevent brute force attacks
  process.nextTick(function () {
    Booth.findOne({ boothname: req.body.boothname }, function (err, booth_found) {
      if (err) { return res.send(500).send(err); }

      // Booth already exists
      else if (booth_found) { return res.status(400).send({ message: "Booth already exists.", errorcode: "BOOTH_EXISTS" }); }
      else {
        booth.save(function (err) {
          if (err)
            return res.status(500).send(err);

          req.login(booth, (err) => console.log(err));
          return res.json({ message: 'New booth manager created' });
        });
      }
    });
  })
};

// Create endpoint /api/booths for GET
exports.getBooths = function (req, res) {

  Booth.find(function (err, booths) {
    if (err)
      return res.send(err);

    res.json( booths.map( x => x.boothname ) );
  });

};


// exports.getBooth = function (req, res) {

//   Booth.findOne({ boothname: req.booth.boothname }, function (err, booth) {
//     if (err) res.status(500).send(err);
//     else res.json(booth);
//   });

// }


function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}