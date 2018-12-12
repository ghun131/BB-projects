const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');

router.get('/', (req, res) => {
    Post.find({}, (err, docs) => {
      const data = docs.reverse().slice(0, 13);
      res.send(data)
    })
 });

module.exports = router;