import React from 'react';
import Grid from '@material-ui/core/Grid'

const Article = (props) => {
    return (
        <div style={{
            width: '80%',
            margin: '10px auto',
            padding: '10px',
            textAlign: 'left'
        }}>
        <div>
            <Grid container spacing={24}>
                <Grid item xs={3}>
                    <h1>{props.title}</h1>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={3} style={{margin: "25px 0", cursor: "pointer"}}>                    
                    <i className="fas fa-edit" ></i>
                </Grid>
            </Grid>
        </div>
        <h4>{props.author}</h4>
        <p><em>{props.time}</em></p>
        <p style={{
            textAlign: 'left',
            whiteSpace: 'pre-line'}}>{props.content}</p>
        </div>
    )
}

export default Article;