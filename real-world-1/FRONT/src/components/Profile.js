import React from 'react';
import { NavLink, Link, Route, Switch } from 'react-router-dom'
import { Subscribe } from 'unstated';
import ArticlePreview from './ArticlePreview';
import UserContainer from '../containers/UserContainer';
import PostContainer from '../containers/PostContainer';

class Profile extends React.Component {
    takeLastWord = () => {
        let authorArr = this.props.location.pathname.split("/");
        let lastWord = authorArr[authorArr.length - 1].trim();
        return lastWord;
    }

    componentDidMount = () => {
        let lastWord = this.takeLastWord();
        PostContainer.getUserPosts( lastWord )
    }

    componentDidUpdate = (prevProps) => {
        if( this.props.location.pathname !== prevProps.location.pathname ) {
            let lastWord = this.takeLastWord();
            if (lastWord === 'favourites') {
                PostContainer.getFavouritePosts( lastWord );
            } else {
                PostContainer.getUserPosts( lastWord )
            }
        }
    }

    render() {
        return (
            <Subscribe to={[UserContainer, PostContainer]}>
                {
                    (userThings, postThings) => (
                        <div className="profile-page">
                        <div className="user-info">
                            <div className="container">
                                <div className="row">
                                    {
                                        postThings.state.author[0] ? 
                                        <div className="col-xs-12 col-md-10 offset-md-1">
                                            <img src={postThings.state.author[0].avaUrl} className="user-img" />
                                            <h4>{postThings.state.author[0].username}</h4>
                                            <p>
                                                {postThings.state.author[0].biography}
                                            </p>
                                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                                <i className="ion-plus-round"></i>
                                                &nbsp;
                                                Follow &nbsp; {postThings.state.author[0].username}
                                            </button>
                                        </div> :
                                        ""
                                    }
                                </div>
                            </div>
                        </div>
    
                        <div className="container">
                            <div className="row">
    
                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <div className="articles-toggle">
                                    {
                                        postThings.state.author[0] ? 
                                        <ul className="nav nav-pills outline-active">
                                            <li className="nav-item">
                                                <NavLink 
                                                    exact
                                                    className="nav-link"
                                                    activeClassName="active"
                                                    to={`/profile/${postThings.state.author[0].username}`}>
                                                    My Articles
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink  
                                                    className="nav-link"
                                                    to={`/profile/${postThings.state.author[0].username}/favourites`}>
                                                    Favorited Articles
                                                </NavLink>
                                            </li>
                                        </ul> : ""
                                    }
                                    </div>

                                    <Switch>
                                        <Route exact path="/profile/:username" key="userPosts" render={() => 
                                            postThings.state.data[0] ?
                                                postThings.state.data.map( p => 
                                                    <ArticlePreview key={p._id} {...p} />
                                                ): <div>Loading articles...</div>}/>

                                        <Route  path="/profile/:username/favourites" key="favourites" 
                                            render={() =>
                                                postThings.state.data[0] ?
                                                    postThings.state.data.map( p => 
                                                        <ArticlePreview key={p._id} {...p} />
                                                    ): <div>Loading articles...</div>
                                        }/>
                                    </Switch>
    
                                    { 
                                        
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

export default Profile;