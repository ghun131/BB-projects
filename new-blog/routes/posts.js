const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');

router.get('/', (req, res) => {
  let data = {};
  async function getPosts() {
    try {
        const posts = await Post
        .find()
        .limit(13)
        .sort({ time: -1});
        data.posts = posts;
    } 
      catch (err) {
        console.log(err.message)
    }
    res.send(data);    
  }

  async function getMostPopularTags() {
    try {
      const tags = await Post.aggregate(
        [
          { $unwind: "$tags" },
          { $group: { _id: "$tags", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 13 }
        ]
      )
      data.tags = tags;
    } catch (err) {
      console.log(err.message);
    }
    getPosts();
  }
  getMostPopularTags()
})

//Pagination for server
router.get("/:pageNum/:last_id", (req, res) => {
  let data = {};
  const lastId = req.params.last_id
  async function getPosts() {
    try {
        const posts = await Post
        .find({'_id': {'$lt': lastId}})
        .limit(13)
        .sort({ time: -1});
        data.posts = posts;
    } 
      catch (err) {
        console.log(err.message)
    }
    res.send(data);    
  }

  async function getMostPopularTags() {
    try {
      const tags = await Post.aggregate(
        [
          { $unwind: "$tags" },
          { $group: { _id: "$tags", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 13 }
        ]
      )
      data.tags = tags;
    } catch (err) {
      console.log(err.message);
    }
    getPosts();
  }
  getMostPopularTags()
})
;

module.exports = router;