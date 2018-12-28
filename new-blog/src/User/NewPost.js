import React from 'react';
import PropTypes from 'prop-types';
import './NewPost.css';
import Spinner from '../Spinner';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'

class NewPost extends React.Component {
    titleRef = React.createRef();
    contentRef = React.createRef();
    tagsRef = React.createRef();

    state = {
        message: '',
        loading: false
    }

    handleSubmitPost = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const post = {
            author: localStorage.getItem('author'),
            email: localStorage.getItem('email'),
            title: this.titleRef.current.value,
            content: this.contentRef.current.value
        }
        this.setState({ loading: true });
        console.log('submit post');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.post('/api/new-post', {post})
            .then(res => {
                console.log(res.data);
                if (res.data.message) {
                    this.setState({ message: res.data.message })
                    setTimeout(() => {
                        this.setState({ message: ''})
                    }, 4000)
                } else {
                    this.setState({ loading: false });
                }
            }).catch(error => console.log(error));
        this.props.history.push('/');
        window.location.reload();
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Spinner />;
        } else {
            content = 
            <div className="NewPost">
                <form onSubmit={this.handleSubmitPost}>
                    <div className="NewPostWrapper">
                        <h1 style={{textAlign: 'left', 
                                    paddingLeft: '5px',
                                    fontStyle: 'italic'}}>{sessionStorage.getItem('author')}</h1>
                        
                        <input  type="text"
                                name="title"
                                className="Title"
                                ref={this.titleRef}
                                placeholder="Title..."/>

                        <textarea   name="content"
                                    id="Content" 
                                    cols="30" rows="10" 
                                    ref={this.contentRef}
                                    placeholder="What do you think...?"></textarea>
                        <div className="Message">{this.state.message}</div>

                        <input  type="text"
                                name="tags"
                                className="Tags"
                                style={{fontWeight: "300"}}
                                ref={this.tagsRef}
                                placeholder="Separate different tags with semi-colon."/>

                        <Button 
                            variant="contained"
                            color="secondary"
                            type="submit"
                            value="POST"> <strong>NEW POST</strong> </Button>
                    </div>
                </form>
            </div>
        }

        return <div>{content}</div>
    }
}

export default withRouter(NewPost);

NewPost.propTypes = {
    postInfo: PropTypes.objectOf(PropTypes.string),
}