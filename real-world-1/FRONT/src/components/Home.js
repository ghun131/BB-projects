import React from 'react';
import { Link, Route, NavLink, Switch } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';
import UserContainer from '../containers/UserContainer';
import ArticlePreview from './ArticlePreview';
import { Subscribe } from 'unstated';

class Home extends React.Component {
    componentDidMount = () => {
        if (this.props.location.pathname !== '/') {
            PostContainer.getPostsByTag(this.props.location.pathname)
        } else {
            PostContainer.getGlobalPosts();
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            if (this.props.location.pathname !== '/') {
                PostContainer.getPostsByTag(this.props.location.pathname)
            } else {
                PostContainer.getGlobalPosts();
            }
        }
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
                                                    <NavLink 
                                                        className="nav-link disabled" 
                                                        to="">
                                                        Your Feed
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink 
                                                        exact
                                                        className="nav-link" 
                                                        activeClassName="active" to="/">
                                                        Global Feed
                                                    </NavLink>
                                                </li>
                                                {
                                                    this.props.location.pathname !== "/" ?
                                                        <li className="nav-item">
                                                            <NavLink 
                                                                exact
                                                                className="nav-link" 
                                                                activeClassName="active" 
                                                                to={`/tag/${postThings.state.tagName}`}>
                                                                #{postThings.state.tagName}
                                                            </NavLink>
                                                        </li> : ""
                                                }
                                                </ul>
                                            </div>

                                            <Switch>
                                                <Route exact path="/" render={() =>
                                                    postThings.state.data[0] ? 
                                                        postThings.state.data.map (p => 
                                                            <ArticlePreview key={p._id} {...p} />)
                                                        : <div>Loading articles...</div>
                                                }/>

                                                <Route path="/tag/:tagName" render={() => 
                                                    postThings.state.data[0] ? 
                                                        postThings.state.data.map (p => 
                                                            <ArticlePreview key={p._id} {...p} />)
                                                        : <div>Loading articles...</div>
                                                }/>
                                            </Switch>
                            
                                            
                                            
                                                    
                                        </div>
                        
                                        <div className="col-md-3">
                                            <div className="sidebar">
                                                <p>Popular Tags</p>
                            
                                                <div className="tag-list">
                                                {
                                                    postThings.state.tags ? 
                                                    postThings.state.tags.map(t => 
                                                        <Link key={t._id} 
                                                            to={`/tag/${t._id}`}
                                                            className="tag-pill tag-default">
                                                            {t._id}
                                                        </Link>
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