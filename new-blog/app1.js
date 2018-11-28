const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const folderPath = __dirname + '/dist/';
const User = require('./modal/User');
const config = require('./config');
const jwt = require('jsonwebtoken');
const Post = require('./modal/Post')
const middleware = require('./middleware');

mongoose.connect('mongodb://hung131:abc123@ds151383.mlab.com:51383/simple-blog-db');

app.use(bodyParser.json());

// GET route for reading data
app.get('/', function (req, res, next) {
  console.log('fileName');
  return res.sendFile(path.join(folderPath + '/index.html'));
});

app.use(express.static(path.join(folderPath)));


//POST route for updating data
app.post('/register', function (req, res, next) {
  const {email, username, password, passwordConf} = req.body.user
  // confirm that user typed same password twice
  if (password !== passwordConf) {
    let err = new Error('Passwords do not match.');
    err.status = 200;
    return res.json({
      success: false,
      message: "Passwords do not match!"
    })
  } else {

  // Check whether email is used or not?
    User.findOne({ email: email }, (err, item) => {
      console.log(item)
      if (err) {
        return res.json(err);
      } else if (item) {
        return res.json({
          success: false,
          message: "This email is already used!"
        })

      } else {

        User.findOne({ username: username }, (err, thing) => {
          if (err) {
            return res.json(err);
          } else if (thing) {
            return res.json({
              success: false,
              message: "This user name is taken! Choose a cooler one!"
            })
          } else {
            let userData = {
              email: email,
              username: username,
              password: password,
              passwordConf: passwordConf,
            }
          
            User.create(userData, (error, user) => {
              if (error) {
                return next(error);
              } else {
                return res.json({
                  success: true
                })
              }
            });
          }
        })

      }
    })
  }
})

// POST log in after registering
app.post('/log-in', (req, res, next) => {
  const { email, password } = req.body.user

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
          return res.json(package)
        }
      })
    }
  })
})

//POST method for new post
app.post('/new-post', middleware.checkToken, (req, res) => {
  const { author, title, content, email } = req.body.post;

  let today = new Date();
  let options = { weekday:'long', year: 'numeric', month: 'long', day: 'numeric', 
                  hour: 'numeric', minute: 'numeric', second: 'numeric' };
  let time = today.toLocaleDateString("en-US", options)

  let postData = {
    author: author,
    title: title,
    email: email,
    content: content,
    time: time
  }

  Post.create(postData, (error, post) => {
    if(error) {
      return error;
    } else {
      Post.find({ email: email }, (err, docs) => {
        if (err) {
          return res.json({
            success: false,
          })
        } else {
          return res.json(docs)
        }
      })
    }
  })
})

app.post('/posts', middleware.checkToken, (req, res) => {
  Post.find({ author: req.body.user.username }, (err, docs) => {
    if(err) {
      res.send(403).json({
        success: false,
        message: 'Something is wrong!'
      })
    } else {
      res.json({
        docs
      })
    }
  })
})

app.listen(3000);