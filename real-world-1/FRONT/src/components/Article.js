import React from 'react';
import { Link } from 'react-router-dom';
import { Subscribe } from 'unstated';
import PostContainer from '../containers/PostContainer';
import UserContainer from '../containers/UserContainer';
import CommentCard from './CommentCard';
import MarkDownDisplay from 'react-markdown';

class Article extends React.Component {
    commentRef = React.createRef();

    componentDidMount = () => {
        console.log('Mount')
        PostContainer.getPost(this.props.location.pathname);
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

    handleFollow = (e, followUser, username) => {
        e.preventDefault();
        followUser( username );
    }

    checkProfile = (username) => {
        if (localStorage.getItem("following")) {
            return localStorage.getItem("following").includes(username);
        } else {
            return false;
        }
    }

    render() {
        let liked = 'btn btn-sm btn-primary';
        let disliked = 'btn btn-sm btn-outline-primary';

        return (
            <Subscribe to={[PostContainer, UserContainer]}>
                {
                    (postThings, userThings) => {
                        if (postThings.state.data && postThings.state.data.length)
                            return (
                                <div className="article-page">
                                    {console.log('article component', postThings.state)}
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
                                                    <button className="btn btn-sm btn-outline-secondary"
                                                        onClick={(e) => this.handleFollow(e, postThings.followUser, postThings.state.author[0].username)}>
                                                            {
                                                                postThings.state.author[0]  ?
                                                                    [this.checkProfile(postThings.state.data[0].author) ? 
                                                                        <span key="unfollow">
                                                                            <i className="ion-plus-round"></i>
                                                                            &nbsp;
                                                                            Unfollow 
                                                                            &nbsp; 
                                                                            {postThings.state.author[0].username}
                                                                            ({postThings.state.author[0].followers.length})
                                                                        </span>
                                                                        : 
                                                                        <span key="follow">
                                                                            <i className="ion-plus-round"></i>
                                                                            &nbsp;
                                                                            Follow
                                                                            &nbsp; 
                                                                            {postThings.state.author[0].username}
                                                                            ({postThings.state.author[0].followers.length})
                                                                        </span>
                                                                    ]
                                                                    : ""                                                        
                                                            }
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
                                        <div className="col-md-12" style={{ whiteSpace: "pre-line"}}>
                                            <MarkDownDisplay source={postThings.state.data[0].content}/>
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
                                                    <button className="btn btn-sm btn-outline-secondary"
                                                        onClick={(e) => this.handleFollow(e, userThings.followUser, postThings.state.author[0].username)}>
                                                            {
                                                                postThings.state.author[0]  ?
                                                                    [this.checkProfile(postThings.state.data[0].author) || userThings.state.following ? 
                                                                        <span key="unfollow">
                                                                            <i className="ion-plus-round"></i>
                                                                            &nbsp;
                                                                            Unfollow 
                                                                            &nbsp; 
                                                                            {postThings.state.author[0].username}
                                                                            ({postThings.state.author[0].followers.length})
                                                                        </span>
                                                                        : 
                                                                        <span key="follow">
                                                                            <i className="ion-plus-round"></i>
                                                                            &nbsp;
                                                                            Follow
                                                                            &nbsp; 
                                                                            {postThings.state.author[0].username}
                                                                            ({postThings.state.author[0].followers.length})
                                                                        </span>
                                                                    ]
                                                                    : ""                                                        
                                                            }
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
                                                        : ""
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>        
                            )
                        else return 'Wating for data...'
                    }
                }
            </Subscribe>
        )
    }
}

export default Article;