import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';

const Profile = (props) => {
    const articles = props.articlesUpdate.map(p => {
        let time = Date(p.time)
        return (
            <Article 
                key={p._id} 
                title={p.title} 
                author={p.author}
                time={time}
                content={p.content}/>
        )
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