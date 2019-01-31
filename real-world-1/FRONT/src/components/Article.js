import React from 'react';
import { Link } from 'react-router-dom';
import { Subscribe } from 'unstated';
import PostContainer from '../containers/PostContainer';
import CommentCard from './CommentCard';

class Article extends React.Component {
    commentRef = React.createRef();

    componentDidMount = () => {
        PostContainer.getPost(this.props.history.location.pathname);
    }

    handleDelete = (e, deletePost, id) => {
        e.preventDefault();
        deletePost(id, this.props.history);
    }

    handleComment = (e, postComment, title) => {
        e.preventDefault();
        let text = this.commentRef.current.value;
        postComment(text, title, this.props.location.pathname);
    }

    render() {
        return (
            <Subscribe to={[PostContainer]}>
                {
                    (postThings) => (
                        <div className="article-page">
                            {console.log('article component', postThings)}
                            <div className="banner">
                                <div className="container">
                    
                                <h1>{postThings.state.data.title}</h1>
                    
                                <div className="article-meta">
                                    <Link to={`/profile/${postThings.state.data.author}`}>
                                        <img src={postThings.state.data.avaUrl} />
                                    </Link>
                                    <div className="info">
                                        <Link to="" className="author">{postThings.state.data.author}</Link>
                                        <span className="date">
                                            {PostContainer.displayTime(postThings.state.data.time)}
                                        </span>
                                    </div>

                                    {
                                        postThings.state.data.author === localStorage.getItem("author") ?
                                            <button onClick={() => this.props.history.push('/editor')}
                                                className="btn btn-sm btn-outline-secondary">
                                                    <i className="ion-edit"></i>
                                                    &nbsp;
                                                    Edit Article
                                            </button>
                                            :
                                            <button className="btn btn-sm btn-outline-secondary">
                                                <i className="ion-plus-round"></i>
                                                &nbsp;
                                                Follow {postThings.state.data.author} <span className="counter">(10)</span>
                                            </button>
                                    }
                                    

                                    &nbsp;&nbsp;

                                    {
                                        postThings.state.data.author === localStorage.getItem("author") ?
                                            <button className="btn btn-sm btn-outline-danger"
                                                onClick={(e) => this.handleDelete(e, postThings.deletePost, postThings.state.data._id)}>
                                                <i className="ion-trash-a"></i>
                                                &nbsp;
                                                Delete Article
                                            </button>
                                            :
                                            <button className="btn btn-sm btn-outline-primary">
                                                <i className="ion-heart"></i>
                                                &nbsp;
                                                Favorite Post <span className="counter">(29)</span>
                                            </button>
                                    }

                                </div>
                    
                                </div>
                            </div>
                    
                            <div className="container page">
                    
                                <div className="row article-content">
                                <div className="col-md-12">
                                    {postThings.state.data.content}
                                </div>
                                </div>
                    
                                <hr />
                    
                                <div className="article-actions">
                                <div className="article-meta">
                                    <Link to={`/profile/${postThings.state.data.author}`}>
                                        <img src={postThings.state.data.avaUrl} />
                                    </Link>
                                    <div className="info">
                                        <Link to={`/profile/${postThings.state.data.author}`} className="author">
                                            {postThings.state.data.title}
                                        </Link>
                                        <span className="date">
                                            {PostContainer.displayTime(postThings.state.data.time)}
                                        </span>
                                    </div>
                    
                                    <button className="btn btn-sm btn-outline-secondary">
                                    <i className="ion-plus-round"></i>
                                    &nbsp;
                                        Follow {postThings.state.data.author} 
                                        <span className="counter">(10)</span>
                                    </button>
                                    &nbsp;
                                    <button className="btn btn-sm btn-outline-primary">
                                        <i className="ion-heart"></i>
                                        &nbsp;
                                        Favorite Post <span className="counter">(29)</span>
                                    </button>
                                </div>
                                </div>
                    
                                <div className="row">
                    
                                    <div className="col-xs-12 col-md-8 offset-md-2">
                        
                                        <form className="card comment-form" 
                                            onSubmit={(e) => this.handleComment(e, postThings.comment, postThings.state.data.title)}>
                                        <div className="card-block">
                                            <textarea className="form-control" 
                                                ref={this.commentRef}
                                                placeholder="Write a comment..." 
                                                rows="3"></textarea>
                                        </div>
                                        <div className="card-footer">
                                            <img src={localStorage.getItem("picUrl")} className="comment-author-img" />
                                            <button className="btn btn-sm btn-primary">
                                                Post Comment
                                            </button>
                                        </div>
                                        </form>
                                        
                                        {
                                            postThings.state.comments[0] ? 
                                                postThings.state.comments.map( c => 
                                                    <CommentCard key={c._id} {...c} />)
                                                : <div>Loading comments...</div>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>        
                    )
                }
            </Subscribe>
        )
    }
}

export default Article;