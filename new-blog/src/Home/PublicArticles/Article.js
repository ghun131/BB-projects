import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

const Article = (props) => {
    const {_id, title, author, content, time} = {...props}
    let displayTime = new Date(parseInt(time)).toString();

    return (
        <div style={{
            width: '80%',
            margin: '10px auto',
            padding: '10px',
            textAlign: 'left'
        }}>
            <Link to={`article/${_id}`}><h1>{title}</h1></Link>
            <h4>{author}</h4>
            <p><em>{displayTime}</em></p>
            <p style={{
                height: '2rem',
                textAlign: 'left',
                overflow: 'hidden',
                whiteSpace: 'pre-line'}}>{content}</p>
            <Link to={`article/${_id}`}>Read more...</Link>  <br/>          
            {props.tags.map(t => 
                <Link 
                    key={t}
                    to={`/profile/${localStorage.getItem("author") + "/posts/" + t}`} 
                    style={{display: "inline-flex"}}>
                        <Chip 
                            style={{marginRight: "5px"}}
                            label={t}
                            component="span"
                            variant="outlined"
                            clickable/>
                </Link>
            )}
        </div>
    )
}

export default Article;