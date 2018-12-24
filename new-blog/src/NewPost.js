import React from 'react';
import PropTypes from 'prop-types';
import './NewPost.css';
import Spinner from './Spinner';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class NewPost extends React.Component {
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        message: '',
        loading: false
    }

    handleSubmitPost = (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('token');
        const post = {
            author: sessionStorage.getItem('author'),
            email: sessionStorage.getItem('email'),
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
                                ref={this.titleRef}
                                placeholder="Title..."/>

                        <textarea   name="content"
                                    id="Content" 
                                    cols="30" rows="10" 
                                    ref={this.contentRef}
                                    placeholder="What do you think...?"></textarea>
                        <div className="Message">{this.state.message}</div>

                        <input  className="Button" 
                                style={{width: '200px', margin: '10px auto'}}
                                type="submit" 
                                value="POST"/>
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