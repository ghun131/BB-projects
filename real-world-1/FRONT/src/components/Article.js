import React from 'react';
import { Link } from 'react-router-dom';
import { Subscribe } from 'unstated';
import PostContainer from '../containers/PostContainer';

class Article extends React.Component {
    componentDidMount = () => {
        PostContainer.getPost(this.props.history.location.pathname);
    }

    handleDelete = (e, deletePost, id) => {
        e.preventDefault();
        deletePost(id, this.props.history);
        
    }

    render() {
        return (
            <Subscribe to={[PostContainer]}>
                {
                    (postThings) => (
                        <div className="article-page">
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
                    
                                    <form className="card comment-form">
                                    <div className="card-block">
                                        <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                                    </div>
                                    <div className="card-footer">
                                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                        <button className="btn btn-sm btn-primary">
                                        Post Comment
                                        </button>
                                    </div>
                                    </form>
                                    
                                    <div className="card">
                                    <div className="card-block">
                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                    <div className="card-footer">
                                        <Link to="" className="comment-author">
                                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                        </Link>
                                        &nbsp;
                                        <Link to="" className="comment-author">Jacob Schmidt</Link>
                                        <span className="date-posted">Dec 29th</span>
                                    </div>
                                    </div>
                    
                                    <div className="card">
                                    <div className="card-block">
                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                    <div className="card-footer">
                                        <Link to="" className="comment-author">
                                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                        </Link>
                                        &nbsp;
                                        <Link to="" className="comment-author">Jacob Schmidt</Link>
                                        <span className="date-posted">Dec 29th</span>
                                        <span className="mod-options">
                                        <i className="ion-edit"></i>
                                        <i className="ion-trash-a"></i>
                                        </span>
                                    </div>
                                    </div>
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