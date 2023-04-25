const express = require('express')
const router = express.Router()

const org = process.env.ORG
const { login } = require('../models/login')

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
var User = require('/path/to/user/login');

app.post('/register', function(req, res) {
  var new_user = new User({
    username: req.body.username
  });

  new_user.password = new_user.generateHash(req.body.password);
  new_user.save();
});

app.post('/login', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {

    if (!user.validPassword(req.body.password)) {
      //password did not match
    } else {
      // password matched. proceed forward
    }
  });
});
var User = mongoose.model('user', userSchema);
module.exports = User;
