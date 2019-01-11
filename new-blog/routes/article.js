const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const Comment = require('../modal/Comment');
// const middleware = require('../middleware');

router.get('/:id', (req, res) => {
    let data = {}
    console.log(req.params.id);

    async function getOneArticle() {
        try {
            const article = await Post.findById(req.params.id);
            data.article = article;
        }
        catch (err) {
            console.log(err.message);
        }
        getComments();
    };

    // This send one single article along with its comments
    // Comment for each article will save the article's id
    // so we can find all comments that have that ID

    async function getComments() {
        try {
            const comments = await Comment
                .find({ articleId: req.params.id })
                .sort('-time')
            data.comments = comments;
            res.send(data);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    getOneArticle();
})

//update love for a particular article
router.put('/:id', (req, res) => {
    const incre = req.body.num;
    async function updateLove(num) {
        try {
            const post = await Post
            .findByIdAndUpdate(req.params.id, 
                { $inc: { love: num } }, 
                { new: true });
            res.send(post);
        } catch (err) {
            console.log(err.message)
        }
    }

    updateLove(incre)
})

//add a new comment
router.post('/:id', (req, res) => {
    const { author, comment, articleTitle } = req.body.data;

    async function createComment() {
        let today = new Date();
        const newComment = new Comment ({
            articleTitle,
            articleId: req.params.id,
            author,
            comment,
            time: Date.parse(today)
        })
    
        try {
          await newComment.save();
          res.send(newComment);
    }
        catch (err) {
          console.log(err.message)
        }
    }

    createComment();
})

// delete a comment
router.delete('/comment/delete/:id', (req, res) => {
    async function deleteComment() {
        try {
          const comment = await Comment.findByIdAndDelete(req.params.id);
          res.send(comment);
        }
        catch(err) {
          console.log(err.message);
        }
      }
    
      deleteComment()
})

module.exports = router;