import React from 'react';
import './Home.css';
import PropTypes from 'prop-types';
import homePic from './cat-theme.jpg';

const Home = (props) => {
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
        <div className="Home">
            <h1>Brave New World!</h1>
            { props.user? 
                articles : <img className="Photo" src={homePic} alt="cat photo"/>}
        </div>           
    )
}

export default Home;

Home.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object)
}