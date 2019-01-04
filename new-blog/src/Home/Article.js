import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

const Article = (props) => {
    const {title, author, content, time} = {...props}
    let displayTime = new Date(parseInt(time)).toString();

    return (
        <div style={{
            width: '80%',
            margin: '10px auto',
            padding: '10px',
            textAlign: 'left'
        }}>
            <h1>{title}</h1>
            <h4>{author}</h4>
            <p><em>{displayTime}</em></p>
            <p style={{
                textAlign: 'left',
                whiteSpace: 'pre-line'}}>{content}</p>
            {props.tags.map(t => 
                <Link 
                    key={t}
                    to={`/profile/${localStorage.getItem("author") + "/" + t}`} 
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