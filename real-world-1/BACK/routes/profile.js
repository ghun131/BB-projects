const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const User = require('../modal/User');
const middleware = require('../middleware');

router.get('/:username', (req, res) => {
  let data = {};
  let userName = req.params.username;
  // if (req.session.username) {
  //   userName = req.session.username
  // }
  // else {
  //   userName = req.params.username
  // }

  async function getUserInfo() {
    try {
      const user = await User
      .find({ username: userName })

      data.user = user;
      res.send(data)
    }
    catch(err) {
      console.log(err.message);
    }
  }

  async function getUserPosts() {
    try {
      const posts = await Post
      .find({ author: userName })
      .limit(13)
      .sort('-time');

      data.posts = posts;
      getUserInfo();
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

// update followers
router.post('/:username', (req, res) => {
  let followers = req.body.followers;
  let username = req.params.username;

  console.log(username, followers);

  async function getUserInfoAndUpdate() {
    try {
      const result = await User.findOneAndUpdate(
        { username: username }, { 
          $set: {
            followers: followers
          }  
        });

        res.send(result);
        console.log(result);
    }
    catch(err) {console.log(err.message)}
  }

  getUserInfoAndUpdate();
})

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

router.post('/:username/favourites', (req, res) => {
  let loveArticles = req.body.loveArticles;
  async function getLovedArticles() {
    try {
        const posts = await Post
        .find({ title: {
          $in: loveArticles
        }})
        .limit(13)
        .sort({ time: -1});

      res.send(posts);    
    } 
      catch (err) {
        console.log(err.message)
    }
  }

  getLovedArticles();
})



router.delete('/delete/:id', (req, res) => {
  async function deletePost() {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      res.send(post);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  deletePost()
})

router.put('/setting/:username', (req, res) => {
  let {avaUrl, email, biography} = req.body.data
  async function updateProfile() {
    try {
        const result = await User.updateOne({ email: email }, {
          $set: {
            avaUrl, email, biography
          }
        });
        
        res.send(result);
    } catch(err) {
      console.log(err.message)
    }
  }

  updateProfile();
})

module.exports = router