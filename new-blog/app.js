const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
// const Post = require('postsCollection');
const User = require('./User');
const KEY = 'aaaabbbb'
const jwt = require('jsonwebtoken')

// jwt.sign({ user: 'hung' }, KEY, {}, function() {
//     console.log(arguments)
// })
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaHVuZyIsImlhdCI6MTU0MTU1Njk1N30.QZDrEMl60P-o05YGNBhxHT3oN_pH5Q77zPWL1KDLh7w'
jwt.verify(TOKEN, KEY, (err, decoded) => {
    console.log(decoded.user)
})
// function mid(req,res,next){
//     console.log('tao la middleware');
//     next();
// }
// app.use(mid);

mongoose.connect('mongodb://hung131:abc123@ds151383.mlab.com:51383/simple-blog-db');

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    
});

app.post('/log-in', (req, res) => {
    
});

app.post('/new-post', (req, res) => {
    let postData = new Post(req.body);
     postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

app.listen(port);

// Read body parser
// Read this stuff https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose