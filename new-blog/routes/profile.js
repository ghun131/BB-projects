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

module.exports = router