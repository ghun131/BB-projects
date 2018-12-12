import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
    const articles = props.articlesUpdate.map(post => {
        return (
        <div className="Article" key={post._id}>
            <h2>{post.title}</h2>
            <h4>{post.author}</h4>
            <p><em>{post.time}</em></p>
            <p style={{textAlign: 'left'}}>{post.content}</p>
        </div>)
    });

    return (
        <div>
            <h1><em>{props.postInfo.author}</em>'s profile</h1>
            {articles}
        </div>
    )
}

export default Profile;

Profile.propTypes = {
    postInfo: PropTypes.objectOf(PropTypes.string),
    articlesUpdate: PropTypes.arrayOf(PropTypes.object)
}