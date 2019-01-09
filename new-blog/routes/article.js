const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
const Comment = require('../modal/Comment');
// const middleware = require('../middleware');

router.get('/:id', (req, res) => {
    let data = {}

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
            const comments = await Comment.find({ article: name });
            data.comments = comments;
            res.send(data);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    getOneArticle();
})

// router.post('/:id', (req, res) => {
//     const id = req.params.id;
//     const { author, comment, articleTitle } = req.body.data;

//     async function createComment() {
//         let today = new Date();
//         const newComment = new Comment ({
//             articleTitle: articleTitle,
//             author: author,
//             comment: comment,
//             time: Date.parse(today)
//         })
    
//         try {
//           await newComment.save();
//           res.send(newComment);
//     }
//         catch (err) {
//           console.log(err.message)
//         }
//     }
// })

module.exports = router;