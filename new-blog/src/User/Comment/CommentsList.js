import React from 'react';
import CommentCard from './CommentCard';

const CommentsList = (props) => {
    return (
        <div>
            {/* We check condition loading here because there is 
            no data at the beginning */}
            {props.comments.map(c => {
                return <CommentCard key={c._id} {...c}/>
            })
            }
        </div>
    )
}

export default CommentsList;