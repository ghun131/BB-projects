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

router.put('/edit/:id', (req, res) => {
  async function updateUser() {
    const post = await Post.findById(req.params.id);

    if (req.body.data.title) {
      post.content = req.body.data.content;
      post.title = req.body.data.title;
      const result = await post.save();
      res.send(post);
    } else {
      res.send('Please enter your text!');
    }
  }

  updateUser()
})

router.delete('/delete/:id', (req, res) => {

})

module.exports = router