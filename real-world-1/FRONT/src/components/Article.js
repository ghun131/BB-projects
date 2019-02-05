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

    handleLike = (e, likePost, id, title) => {
        e.preventDefault();

        likePost(id, title)
    }

    checkLikeButton = (title) => {
        let loveArt = [];
        let loveArticles = localStorage.getItem("loveArticles");
        if (loveArticles != 'undefined' && loveArticles != undefined) { 
            loveArt = loveArticles.split(",").filter(art => art === title);
        }
        if (loveArt[0]) { 
            return true 
        } else {
             return false 
        }
    }

    render() {
        

        let liked = 'btn btn-sm btn-primary';
        let disliked = 'btn btn-sm btn-outline-primary';

        return (
            <Subscribe to={[PostContainer]}>
                {
                    (postThings) => (
                        <div className="article-page">
                            {console.log('article component', postThings)}
                            <div className="banner">
                                <div className="container">
                    
                                <h1>{postThings.state.data[0].title}</h1>
                    
                                <div className="article-meta">
                                    <Link to={`/profile/${postThings.state.data[0].author}`}>
                                        <img src={postThings.state.data[0].avaUrl} />
                                    </Link>
                                    <div className="info">
                                        <Link to={`/profile/${postThings.state.data[0].author}`} 
                                            className="author">
                                                {postThings.state.data[0].author}
                                        </Link>
                                        <span className="date">
                                            {PostContainer.displayTime(postThings.state.data[0].time)}
                                        </span>
                                    </div>

                                    { 
                                        postThings.state.data[0].author === localStorage.getItem("author") ?
                                            <button className="btn btn-sm btn-outline-secondary"
                                                onClick={() => 
                                                    this.props.history.push(`/editor/${postThings.state.data[0]._id}`)
                                                }>
                                                    <i className="ion-edit"></i>
                                                    &nbsp;
                                                    Edit Article
                                            </button>
                                            :
                                            <button className="btn btn-sm btn-outline-secondary">
                                                <i className="ion-plus-round"></i>
                                                &nbsp;
                                                Follow {postThings.state.data[0].author} 
                                                <span className="counter">
                                                    ({
                                                        postThings.state.author[0] ?
                                                            postThings.state.author[0].followers.length
                                                            : ""
                                                    })
                                                </span>
                                            </button>
                                    }
                                    

                                    &nbsp;&nbsp;

                                    {
                                        postThings.state.data[0].author === localStorage.getItem("author") ?
                                            <button className="btn btn-sm btn-outline-danger"
                                                onClick={(e) => this.handleDelete(e, postThings.deletePost, postThings.state.data[0]._id)}>
                                                <i className="ion-trash-a"></i>
                                                &nbsp;
                                                Delete Article
                                            </button>
                                            :
                                            <button className={ this.checkLikeButton(postThings.state.data[0].title) ? liked : disliked }
                                                onClick={(e) => 
                                                    this.handleLike(e, postThings.likePost, postThings.state.data[0]._id, postThings.state.data[0].title)
                                                }
                                            >
                                                <i className="ion-heart"></i>
                                                &nbsp;
                                                { this.checkLikeButton(postThings.state.data[0].title) ? "Unfavourite" : "Favourite" } Post 
                                                <span className="counter"> ({postThings.state.data[0].love})</span>
                                            </button>
                                    }

                                </div>
                    
                                </div>
                            </div>
                    
                            <div className="container page">
                    
                                <div className="row article-content">
                                <div className="col-md-12">
                                    {postThings.state.data[0].content}
                                </div>
                                </div>
                    
                                <hr />
                    
                                <div className="article-actions">
                                <div className="article-meta">
                                    <Link to={`/profile/${postThings.state.data[0].author}`}>
                                        <img src={postThings.state.data[0].avaUrl} />
                                    </Link>
                                    <div className="info">
                                        <Link to={`/profile/${postThings.state.data[0].author}`} className="author">
                                            {postThings.state.data[0].title}
                                        </Link>
                                        <span className="date">
                                            {PostContainer.displayTime(postThings.state.data[0].time)}
                                        </span>
                                    </div>
                    
                                    {
                                        postThings.state.data[0].author === localStorage.getItem("author") ?
                                            <button className="btn btn-sm btn-outline-secondary"
                                                onClick={() => 
                                                    this.props.history.push(`/editor/${postThings.state.data[0]._id}`)
                                                }>
                                                    <i className="ion-edit"></i>
                                                    &nbsp;
                                                    Edit Article
                                            </button>
                                            :
                                            <button className="btn btn-sm btn-outline-secondary">
                                                <i className="ion-plus-round"></i>
                                                &nbsp;
                                                Follow {postThings.state.data[0].author} 
                                                <span className="counter">
                                                    ({
                                                        postThings.state.author[0] ?
                                                            postThings.state.author[0].followers.length
                                                            : ""
                                                    })
                                                </span>
                                            </button>
                                    }
                                    

                                    &nbsp;&nbsp;

                                    {
                                        postThings.state.data[0].author === localStorage.getItem("author") ?
                                            <button className="btn btn-sm btn-outline-danger"
                                                onClick={(e) => this.handleDelete(e, postThings.deletePost, postThings.state.data[0]._id)}>
                                                <i className="ion-trash-a"></i>
                                                &nbsp;
                                                Delete Article
                                            </button>
                                            :
                                            <button className={ this.checkLikeButton(postThings.state.data[0].title) ? liked : disliked }
                                                onClick={(e) => 
                                                    this.handleLike(e, postThings.likePost, postThings.state.data[0]._id, postThings.state.title)
                                                }
                                            >
                                                <i className="ion-heart"></i>
                                                &nbsp;
                                                { this.checkLikeButton(postThings.state.data[0].title) ? "Unfavourite" : "Favourite" } Post 
                                                <span className="counter">({postThings.state.data[0].love})</span>
                                            </button>
                                    }

                                </div>
                                </div>
                    
                                <div className="row">
                    
                                    <div className="col-xs-12 col-md-8 offset-md-2">
                        
                                        <form className="card comment-form" 
                                            onSubmit={(e) => this.handleComment(e, postThings.comment, postThings.state.data[0].title)}>
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