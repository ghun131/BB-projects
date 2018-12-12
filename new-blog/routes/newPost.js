const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const middleware = require('../middleware');

router.post('/', middleware.checkToken, (req, res) => {
    const { author, title, content, email } = req.body.post;
  
    let today = new Date();
    let options = { weekday:'long', year: 'numeric', month: 'long', day: 'numeric', 
                    hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let time = today.toLocaleDateString("en-US", options)
  
    let postData = {
      author: author,
      title: title,
      email: email,
      content: content,
      time: time
    }
  
    Post.create(postData, (error, post) => {
      if(error) {
        return error;
      } else {
        Post.find({ email: email }, (err, docs) => {
          if (err) {
            return res.json({
              success: false,
            })
          } else {
            return res.json(docs)
          }
        })
      }
    })
  })

module.exports = router;