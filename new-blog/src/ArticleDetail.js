import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import CommentsList from './CommentsList';

class ArticleDetail extends React.Component {
    state={
        article: {},
        comments: []
    }

    componentDidMount() {
        // get a single article
        console.log('component did mount before request')
        axios.get(this.props.history.location.pathname)
            .then( res => {
                console.log('component did mount after request', res.data)
                this.setState({ 
                    article: res.data.article,
                    comments: res.data.comments
                });
            })
            .catch (error => console.log(error))
    }

    render() {
        console.log('render', this.state.article)
        const { author, content, title, time, tags} = {...this.state.article}
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
                <p>{author ? tags.map (t =>
                    <Link key={t}
                        to={`/profile/${localStorage.getItem("author") + "/posts/" + t}`} 
                        style={{display: "inline-flex"}}>
                            <Chip 
                                style={{marginRight: "5px"}}
                                label={t}
                                component="span"
                                variant="outlined"
                                clickable/>
                    </Link>) : ""}
                </p>
                <p>
                    <Link to="/register">Sign in</Link> or <Link to="/log-in">sign up</Link>
                    to add comment on this article
                </p>
                {
                    author ? <CommentsList comments={this.state.comments}/>
                    : ""
                }
            </div>
        )
    }
}

export default ArticleDetail;