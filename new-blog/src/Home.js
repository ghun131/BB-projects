import React from 'react';
import './Home.css';
import PropTypes from 'prop-types';
import homePic from './cat-theme.jpg';

const Home = (props) => {
    const posts = props.allPosts.map(p => {
        const time = Date(p.time);

        return (
        <div style={{
            width: '80%',
            margin: '10px auto',
            padding: '10px',
            textAlign: 'left',
            border: '1px solid black',
            borderRadius: '5px'
        }} 
            key={p._id}>
                <h2>{p.title}</h2>
                <h4>{p.author}</h4>
                <p><em>{time}</em></p>
                <p style={{textAlign: 'left'}}>{p.content}</p>
        </div>
        )
    })
    return (
        <div className="Home">
            <h1>Brave New World!</h1>
                <img className="Photo" src={homePic} alt="cat photo"/>
            {posts}
        </div>           
    )
}

export default Home;
