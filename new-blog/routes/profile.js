const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const middleware = require('../middleware');

router.get('/:username', (req, res) => {
  let data = {};
  let userName = req.session.username;
  if (req.session.username) {
    userName = req.session.username
  }
  else {
    userName = req.params.username
  }

  async function getUserPosts() {
    try {
      const posts = await Post
      .find({ author: userName })
      .limit(13)
      .sort('-time');

      data.posts = posts;
      res.send(data);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  async function totalUserPosts() {
    try {
      const totalNum = await Post.aggregate([
        { $match: { author: userName }}, { $count: "posts"}
      ]);

      data.totalDocuments = totalNum;
    } catch (err) {
      console.log(err.message);
    }
    getUserPosts();
  }

  totalUserPosts();
});

router.get('/:username/posts/:page', (req, res) => {
  let data = {};
  const userName = req.params.username;
  const getDocs = req.params.page - 1;
  async function getUserPosts() {
    try {
        const posts = await Post
        .find({ author: userName })
        .skip(13 * getDocs)
        .limit(13)
        .sort({ time: -1});
        data.posts = posts;
    } 
      catch (err) {
        console.log(err.message)
    }
    res.send(data);    
  }

  async function totalUserPosts() {
    try {
      const totalNum = await Post.aggregate([
        { $match: { author: userName }}, { $count: "posts"}
      ]);

      data.totalDocuments = totalNum;
    } catch (err) {
      console.log(err.message);
    }
    getUserPosts();
  }

  totalUserPosts();
})

router.get('/:username/:tag', (req, res) => {
  let tag = req.params.tag;

  async function getArticlesOfATag() {
    try {
      const tagArticles = await Post
      .find({ tags: tag })
      .sort('-time');

      res.send(tagArticles);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  getArticlesOfATag();
})

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