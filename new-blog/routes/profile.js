const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const middleware = require('../middleware');

router.get('/', middleware.checkToken, (req, res) => {
  const username = req.session.username;
  async function getUserPosts() {
    const profile = await Post
      .find({ author: username })
      .sort('-time');

      res.send(profile);
  }

  getUserPosts()
});

router.put('/:id', (req, res) => {
  async function updateUser() {
    const post = await Post.findById(req.params.id);

    if (req.body.content) {
      post.content = req.body.content;
      res.send(post);
    } else {
      res.send('Please enter your text!');
    }
  }

  updateUser()
})

module.exports = router