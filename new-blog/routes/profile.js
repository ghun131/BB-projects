const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const middleware = require('../middleware');

router.post('/', middleware.checkToken, (req, res) => {
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

module.exports = router