const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const middleware = require('../middleware');

router.post('/', middleware.checkToken, (req, res) => {
  async function getProfile () {
    const profile = await Post
      .find({ author: req.body.user.username })
      .sort('-time');

      res.send(profile);
  }

  getProfile()
  
})

module.exports = router