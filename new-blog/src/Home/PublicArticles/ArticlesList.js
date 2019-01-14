import React from 'react';
import Article from './Article';

const ArticlesList = (props) => {
    return (
        <div>
            {
                props.posts.map(p => {
                    return <Article key={p._id} {...p} 
                        clickedHeart={props.clickedLove}
                        isLove={props.isLove}/>
                })
            }
        </div>
    )
}

export default ArticlesList