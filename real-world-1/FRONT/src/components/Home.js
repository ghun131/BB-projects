import React from 'react';
import { Link, Route, NavLink, Switch } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';
import UserContainer from '../containers/UserContainer';
import ArticlePreview from './ArticlePreview';
import { Subscribe } from 'unstated';

class Home extends React.Component {
    componentDidMount = () => {
        this.callFunctionWithRightRoute();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.location.pathname !== prevProps.location.pathname) {      
            this.callFunctionWithRightRoute();
        }
    }

    callFunctionWithRightRoute = () => {
        let lastWord = PostContainer.takeLastWord(this.props.location.pathname);
        if (this.props.location.pathname === '/') {
            PostContainer.getGlobalPosts();
        } 
        else if (this.props.location.pathname === '/feed') {
            console.log('feed');
            PostContainer.getFeed();
        } else {
            PostContainer.getPostsByTag(this.props.location.pathname)
        }
    }

    handleClickPageNum(getPostsPagination, num) {
        getPostsPagination(num);
    }

    render() {
        let notClick = "page-item";
        let clicked = "page-item active";

        return (
            <Subscribe to={[PostContainer, UserContainer]}>
                {
                    (postThings, userThings) => (
                        <div>
                            <div className="home-page">
                
                                <div className="banner">
                                    <div className="container">
                                        <h1 className="logo-font">BB BLOG</h1>
                                        <p>Music makes you brave.</p>
                                    </div>
                                </div>
                    
                                <div className="container page">
                                    <div className="row">
                    
                                        <div className="col-md-9">
                                            <div className="feed-toggle">
                                                <ul className="nav nav-pills outline-active">
                                                {
                                                    userThings.state.isLogin ? 
                                                        <li className="nav-item">
                                                            <NavLink
                                                                exact
                                                                className="nav-link" 
                                                                to="/feed"
                                                                activeClassName="active">
                                                                Your Feed
                                                            </NavLink>
                                                        </li> : ""
                                                }
                                                
                                                <li className="nav-item">
                                                    <NavLink 
                                                        exact
                                                        to="/"
                                                        className="nav-link" 
                                                        activeClassName="active" >
                                                        Global Feed
                                                    </NavLink>
                                                </li>
                                                {
                                                    this.props.location.pathname !== "/" && this.props.location.pathname !== "/feed"?
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
                                                <Route exact path="/feed" render={() =>
                                                    postThings.state.data[0] ? 
                                                        postThings.state.data.map (p => 
                                                            <ArticlePreview key={p._id} {...p} />)
                                                        : [ localStorage.getItem("following") ?
                                                            <div key="loading">Loading articles...</div>
                                                            : <div key="no-articles">No articles are here...yet</div>]
                                                }/>

                                                <Route exact path="/" render={() =>
                                                    postThings.state.data[0] ? 
                                                        postThings.state.data.map (p => 
                                                            <ArticlePreview key={p._id} {...p} />)
                                                        : <div>Loading articles...</div>
                                                }/>
                                                
                                                <Route exact path="/tag/:tagName" render={() => 
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
                        
                                        <nav>
                                            <ul className="pagination">
                                                {
                                                    postThings.state.pageNums[0] ?
                                                        postThings.state.pageNums.map (n => 
                                                            <li className={n == postThings.state.currentPageNum ? clicked : notClick}
                                                                onClick={() => this.handleClickPageNum(postThings.getPostsPagination, n)}
                                                                key={n}>
                                                                    <span style={{cursor: "pointer"}} 
                                                                        className="page-link">
                                                                        {n}
                                                                    </span>
                                                            </li>
                                                            
                                                        ) : ""
                                                }
                                            </ul>
                                        </nav>
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