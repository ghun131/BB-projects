import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const Article = (props) => {
    const {_id, author, content, title, time} = {...props}
    let displayTime = new Date(parseInt(time)).toString();
    return (
        <div style={{ textAlign: 'left'}}>
            <Grid container spacing={24}>
                <Grid item xs={9}>
                    <h1>{title}</h1>
                </Grid>
                <Grid 
                    item xs={3} 
                    style={{ margin: '25px 0px', cursor: "pointer" }}>
                    <Button size="small" onClick={() => props.edit(_id)}>
                        <i className="fas fa-edit fa-lg" ></i>
                    </Button>
                    <Button size="small" onClick={() => props.alert(_id)}>
                        <i className="fas fa-trash-alt fa-lg"></i>
                    </Button>
                </Grid>
            </Grid>
            <h4>{author}</h4>
            <p><em>{displayTime}</em></p>
            <p style={{
                textAlign: 'left',
                whiteSpace: 'pre-line'}}>{content}</p>
            {props.tags
                .map(t => 
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

Article.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object),
    author: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string
}