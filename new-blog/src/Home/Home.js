import React from 'react';
import './Home.css';
import homePic from '../cat-theme.jpg';
import Article from './Article';

const Home = (props) => {
    const posts = props.allPosts.map(p => {
        const time = Date(p.time);

        return <Article key={p._id} {...p}/>
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
