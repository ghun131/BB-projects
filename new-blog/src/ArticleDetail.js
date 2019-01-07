import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

class ArticleDetail extends React.Component {
    state={
        data: {}
    }

    componentDidMount() {
        // get a single article
        console.log('component did mount')
        axios.get(this.props.history.location.pathname)
            .then( res => {
                console.log('component did mount after request',res.data)
                this.setState({ data: res.data });
            })
            .catch (error => console.log(error))
    }

    render() {
        console.log('render', this.state.data)
        const { author, content, title, time} = {...this.state.data}
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
                {this.state.data.author ? this.state.data.tags.map (t =>
                    <Link key={t}
                        to={`/profile/${localStorage.getItem("author") + "/posts/" + t}`} 
                        style={{display: "inline-flex"}}>
                            <Chip 
                                style={{marginRight: "5px"}}
                                label={t}
                                component="span"
                                variant="outlined"
                                clickable/>
                    </Link>)
                    : ""}
            </div>
        )
    }
}

export default ArticleDetail;