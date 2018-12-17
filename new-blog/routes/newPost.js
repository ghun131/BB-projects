const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const middleware = require('../middleware');

// router.post('/', middleware.checkToken, (req, res) => {
//   const { author, title, content, email } = req.body.post;

//   let today = new Date();
//   let savedTime = Date.parse(today);

//   let postData = {
//     author: author,
//     title: title,
//     email: email,
//     content: content,
//     time: savedTime
//   }

//   Post.create(postData, (error, post) => {
//     if(error) {
//       return error;
//     } else {
//       Post.find({ email: email }, (err, docs) => {
//         if (err) {
//           return res.json({
//             success: false,
//           })
//         } else {
//           return res.json(docs)
//         }
//       })
//     }
//   })
// })

router.post('/', middleware.checkToken, (req, res) => {
  const { author, title, content, email } = req.body.post;

  async function createPost() {
    let today = new Date();
    const newPost = new Post ({
      author: author,
      title: title,
      email: email,
      content: content,
      time: Date.parse(today)
    })

    try {
      await newPost.save();
      sendPosts(email);
  }
    catch (err) {
      console.log(err)
    }
  }

  async function sendPosts(email) {
    const posts = await Post.find({ email: email }).limit(13).sort('time')

    return res.json(posts);
  }

  async function checkPost(content) {
    const samePost = await Post.find({ content: content })
    if(!samePost[0]) createPost()
    else { res.json({
      message: 'It \'s fucking plagirism! Write something \'s else'
    })}
  }

  checkPost(content)
})

module.exports = router;