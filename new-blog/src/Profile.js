import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
    const articles = props.articlesUpdate.map(post => {
        let time = Date(post.time)
        return (
        <div className="Article" key={post._id}>
            <h2>{post.title}</h2>
            <h4>{post.author}</h4>
            <p><em>{time}</em></p>
            <p style={{
                textAlign: 'left',
                whiteSpace: 'pre-line'}}>{post.content}</p>
        </div>)
    });

    return (
        <div>
            <h1><em>{sessionStorage.getItem('author')}</em>'s profile</h1>
            {articles}
        </div>
    )
}

export default Profile;

Profile.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object)
}