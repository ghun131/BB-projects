import React from 'react';

const Article = (props) => {
    return (
        <div style={{
            width: '80%',
            margin: '10px auto',
            padding: '10px',
            textAlign: 'left'
        }}>
        <h1>{props.title}</h1>
        <h4>{props.author}</h4>
        <p><em>{props.time}</em></p>
        <p style={{
            textAlign: 'left',
            whiteSpace: 'pre-line'}}>{props.content}</p>
        </div>
    )
}

export default Article;