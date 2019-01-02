import React from 'react';
import Article from './Article';

const TagArticlesList = (props) => {
    return (
        <div>
            {props.tagArticlesList.map(a => {
                return (
                    <Article
                        key={a._id} 
                        edit={props.edited}
                        alert={props.deleted}
                        {...a}/>
                )
            })}
        </div>
    )
}

export default TagArticlesList;