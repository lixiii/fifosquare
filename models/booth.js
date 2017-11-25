// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define booth schema
var BoothSchema = new mongoose.Schema({
  boothname: String,
  password: {
    type: String,
    required: true
  },
  email :{
    type: String,
    unique: true,
    required: true
  },
  qblksize : {
    type : Number,
    required : false
  },
  phoneNumber: String
});

// Execute before each booth.save() call
BoothSchema.pre('save', function(callback) {
  var booth = this;

  // Break out if the password hasn't changed
  if (!booth.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(booth.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      booth.password = hash;
      callback();
    });
  });
});

BoothSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('Booth', BoothSchema);