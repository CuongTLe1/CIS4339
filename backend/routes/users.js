const express = require('express')
const router = express.Router()


const org = process.env.ORG

// importing data model schemas
const { users } = require('../models/models')


//register a new user
router.post('/register', function(req, res) {
  var new_user = new users({
    username: req.body.username,
    role: req.body.role,
    org: org
  });

  new_user.password = new_user.generateHash(req.body.password);
  new_user.save();
  res.send('Registered')
});


//user login
router.post('/login', function(req, res) {
  users.findOne({username: req.body.username, org: org}, function(err, user) {
    //if cant find the username and org
    if(!user){
      res.send('Failed')
    }
    //if the password is invalid for that username
    else if (!user.validPassword(req.body.password)) {
      res.send('Failed')
    } else {
      res.send({
        message: 'Success',
        role: user.role
      })
    }
  });
});



module.exports = router

//reference:
//https://stackoverflow.com/questions/43092071/how-should-i-store-salts-and-passwords-in-mongodb