const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const register = require('./routes/register');
const logIn = require('./routes/logIn');
const newPost = require('./routes/newPost');
const profile = require('./routes/profile');
const posts = require('./routes/posts');
const express = require('express');
const app = express();

mongoose.connect('mongodb://hung131:abc123@ds151383.mlab.com:51383/simple-blog-db');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

// GET route for reading data
app.use('/api/posts', posts);

//POST route for register new user
app.use('/api/register', register);

// POST log in after registering
app.use('/api/log-in', logIn);

//POST method for new post
app.use('/api/new-post', newPost);

//POST method find all posts of one author
app.use('/api/profile', profile);

app.listen(3000 || process.env.PORT, () => console.log('Listening...'));