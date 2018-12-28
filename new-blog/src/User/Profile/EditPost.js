import React from 'react';
import PropTypes from 'prop-types';
import './EditPost.css';
import Spinner from '../../Spinner';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'

class EditPost extends React.Component {
    state={
        loading: false,
        title: '',
        content: '',
        message: ''
    }

    componentDidMount() {
        // fill content and title into state to pass to input boxes
        const pathnameArr = this.props.location.pathname.split("/");
        const id = pathnameArr[pathnameArr.length - 1];
        const postId = id.slice(0, id.length - 1);
        const articles = this.props.articlesUpdate;
        const post = articles.filter(p => p._id === postId);
        let { title, content } = {...this.state};
        title = post[0].title;
        content = post[0].content
        this.setState({
            id: postId,
            title: title,
            content: content
        })
    }

    handleSubmitPost = (e) => {
        e.preventDefault();

        const { title, content } = {...this.state}
        const data = {
            title: title,
            content: content
        }

        axios.put(`/profile/edit/${this.state.id}`, {data})
            .then(res => {
                this.props.history.push('/');
                window.location.reload();
            })
            .catch(err => console.log(err.message));
    }

    handleChange = (e) => {    
        this.setState({ [e.target.name]: [e.target.value] })
    }

    render() {
        let displayContent;
        if (this.state.loading) {
            displayContent = <Spinner />;
        } else {
            displayContent = 
            <div className="EditPost">
                <form onSubmit={this.handleSubmitPost}>
                    <div className="EditPostWrapper">                        
                        <input  type="text"
                                className="Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange} />

                        <textarea  name="content"
                                id="Content" 
                                cols="30" rows="10" 
                                value={this.state.content}
                                onChange={this.handleChange} />
                        <div className="Message">{this.state.message}</div>

                        <Button 
                            variant="contained"
                            color="secondary"
                            type="submit"
                            value="POST"> <strong>EDIT POST</strong> </Button>
                    </div>
                </form>
            </div>
        }

        return displayContent
    }
}

export default withRouter(EditPost);

EditPost.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object),
}