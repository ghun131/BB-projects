const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../modal/User');
const Post = require('../modal/Post')
const bcrypt = require('bcrypt');
const config = require('../config');

router.post('/', (req, res, next) => {
    const { email, password } = req.body.user
    console.log('received!')  
    let package = {}
  
    Post.find({ email: email }, (err, docs) => {
      if (err) {
        return res.json({
          success: false,
        })
      } else {
        package.collection = docs
      }
    })
  
    User.findOne({ email: email }, (err, adventure) => {
      if (err) {
        return res.json({
          success: false
        })
      } else if (!adventure) {
        console.log('received')
        return res.json({
          success: false,
          message: "No email found! Sign up to do cool stuff!"
        })
      } else {
        bcrypt.compare(password, adventure.password, (err, check) => {
          if (err) {
            return res.json({
              success: false,
            })
          } else if (!check) {
            return res.json({
              success: false,
              message: 'Wrong password!'
            })
          } else {
            let token = jwt.sign({ email: adventure.email }, config.secret, { expiresIn: '24h' })
            package.token = token;
            package.email = adventure.email;
            package.username = adventure.username;
            return res.json({
              success: true,
              package})
          }
        })
      }
    })
  })

  module.exports = router;