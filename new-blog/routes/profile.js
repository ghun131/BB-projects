const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const middleware = require('../middleware');

router.get('/',  (req, res) => {
  const username = req.session.username;
  async function getUserPosts() {
    try {
      const profile = await Post
      .find({ author: username })
      .sort('-time');

      res.send(profile);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  getUserPosts()
});

router.put('/edit/:id', (req, res) => {
  async function updateUser() {
    try {
      const post = await Post.findById(req.params.id);

      if (req.body.data.title) {
        post.content = req.body.data.content;
        post.title = req.body.data.title;
        post.tags = req.body.data.tags;
        const result = await post.save();
        res.send(post);
      } else {
        res.send('Please enter your text!');
      }
    }
    catch(err) {
      console.log(err.message)
    }
  }

  updateUser()
})

router.delete('/delete/:id', (req, res) => {
  async function deletePost() {
    try {
      const post = await Post.findByIdAndDelete(req.params.id)
      res.send(post);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  deletePost()
})

module.exports = router