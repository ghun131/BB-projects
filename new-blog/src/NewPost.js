import React from 'react';
import PropTypes from 'prop-types';
import './NewPost.css';

const NewPost = (props) => {
    return (
        <div className="NewPost">
            <form onSubmit={props.clickPost}>
                <div className="NewPostWrapper">
                    <h1 style={{textAlign: 'left', paddingLeft: '5px'}}>{props.postInfo.author}</h1>
                    
                    <input  type="text"
                            name="title"
                            value={props.postInfo.title}
                            onChange={props.postChanged}
                            placeholder="Title..."/>

                    <textarea   name="content"
                                id="Content" 
                                cols="30" rows="10" 
                                value={props.postInfo.content}
                                onChange={props.postChanged}
                                placeholder="What do you think...?"></textarea>

                    <input  className="Button" 
                            style={{width: '200px', margin: '10px auto'}}
                            type="submit" 
                            value="POST"/>
                </div>
            </form>
        </div>
    )
}

export default NewPost;

NewPost.propTypes = {
    clickPost: PropTypes.func,
    postInfo: PropTypes.objectOf(PropTypes.string),
    postChanged: PropTypes.func
}