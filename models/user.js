// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define child schema: TransactionSummarySchema
var TransactionSummarySchema = new mongoose.Schema({
  id: { // transaction id from the transaction model
    type: String,
    required: true
  },
  amount: Number,
  type: String
})

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email :{
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "free"
  },
  transactions: { //an array of transactionSummary objects defined above
    type: [{TransactionSummarySchema}],
    default: []
  },
  credit: {
    type: Number,
    default: 300
  },
  hash: {
    type: String
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.isAdmin = function(){
  if(this.type === "admin") return true;
  else return false;
}

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);