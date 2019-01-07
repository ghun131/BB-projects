const express = require('express');
const router = express.Router();
const Post = require('../modal/Post');
// const middleware = require('../middleware');

router.get('/:id', (req, res) => {
    const id = req.params;
    console.log('HIT', id)

    async function getOneArticle() {
        try {
            const article = await Post.findById(req.params.id);
            res.send(article);
        }
        catch (err) {
            console.log(err.message);
        }

    };

    getOneArticle();
})

module.exports = router;