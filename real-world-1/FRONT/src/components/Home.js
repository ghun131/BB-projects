import React from 'react';
import { Link } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';
import UserContainer from '../containers/UserContainer';
import { Subscribe } from 'unstated';

class Home extends React.Component {
    componentDidMount() {
        if (localStorage.getItem("email")) {
            // Auto log in when user info is saved into local storage
            UserContainer.doLogin (
                localStorage.getItem("email"),
                localStorage.getItem("password"),
                this.props.history )
        }
        PostContainer.getGlobalPosts();
    }

    render() {
        return (
            <Subscribe to={[PostContainer, UserContainer]}>
                {
                    (postThings, userThings) => (
                        <div>
                            <div className="home-page">
                
                                <div className="banner">
                                    <div className="container">
                                        <h1 className="logo-font">conduit</h1>
                                        <p>A place to share your knowledge.</p>
                                    </div>
                                </div>
                    
                                <div className="container page">
                                    <div className="row">
                    
                                        <div className="col-md-9">
                                            <div className="feed-toggle">
                                                <ul className="nav nav-pills outline-active">
                                                <li className="nav-item">
                                                    <Link className="nav-link disabled" to="">Your Feed</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link active" to="">Global Feed</Link>
                                                </li>
                                                </ul>
                                            </div>
                            
                                            {
                                                postThings.state.data ? 
                                                postThings.state.data.map( p => 
                                                    <div className="article-preview" key={p._id}>
                                                        <div className="article-meta">
                                                            <Link to={`/profile/${p.author}`}>
                                                                <img src={p.avaUrl} />
                                                            </Link>
                                                            <div className="info">
                                                                <Link to={`/profile/${p.author}`} className="author">
                                                                    {p.author}
                                                                </Link>
                                                                <span className="date">{postThings.displayTime(p.time)}</span>
                                                            </div>
                                                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                                                <i className="ion-heart"></i> {p.love}
                                                            </button>
                                                        </div>
                                                        <Link to="/article" className="preview-link">
                                                            <h1>{p.title}</h1>
                                                            <p style={{overflow: "hidden", height: "1.5rem"}}>
                                                                {p.content}
                                                            </p>
                                                            <span>Read more...</span>
                                                            <ul className="tag-list">
                                                                {
                                                                    p.tags ? 
                                                                    p.tags.map( t => 
                                                                        <li className="tag-default tag-pill tag-outline" key={t}>
                                                                            {t}
                                                                        </li>
                                                                    ) : ""
                                                                }
                                                            </ul>
                                                        </Link>
                                                    </div>
                                                )
                                                : <div>Loading articles...</div>
                                            }
                                            
                                                    
                                        </div>
                        
                                        <div className="col-md-3">
                                            <div className="sidebar">
                                                <p>Popular Tags</p>
                            
                                                <div className="tag-list">
                                                {
                                                    postThings.state.tags ? 
                                                    postThings.state.tags.map(t => 
                                                        <Link key={t._id} to="" className="tag-pill tag-default">{t._id}</Link>
                                                    ) : ""
                                                }
                                                </div>
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

export default Home;