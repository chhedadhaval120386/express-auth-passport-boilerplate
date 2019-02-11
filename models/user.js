const { hashSync, genSaltSync, compareSync } = require('bcryptjs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
});

userSchema.pre('save', function(next) {
  let salt = genSaltSync(10);
  let hash = hashSync(this.password, salt);

  this.password = hash;
  next();
});

userSchema.methods.matchesPassword = function(password) {
  return compareSync(password, this.password);
};

const user = mongoose.model('User', userSchema);

module.exports = user;
