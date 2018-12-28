import React from 'react';
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
                <Chip key={t}
                    style={{marginRight: "5px"}}
                    label={t}
                    component="a"
                    href="#chip"
                    variant="outlined"
                    clickable/>)}
        </div>
    )
}

export default Article;