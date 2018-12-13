const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');

router.get('/', (req, res) => {
  async function getPosts() {
    const posts = await Post
    .find()
    .limit(13)
    .sort({ time: -1});
    res.send(posts)
  }
  
  getPosts()
});

module.exports = router;