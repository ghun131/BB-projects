import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home/Home';
import NewPost from './User/NewPost';
import Register from './Auth/Register';
import LogIn from './Auth/LogIn';
import ArticleDetail from './ArticleDetail';
import Setting from './User/Setting';
import ArticlesWithPopularTags from './User/Profile/TagArticles/ArticlesWithPopularTags';
import Profile from './User/Profile/Profile';
import EditPost from './User/Profile/EditPost';

const routePath = (props) => {
    return (
        <div>
            <Route exact path="/" 
                render={() => 
                    <Home user={props.isUser}
                        articlesUpdate={props.articlesList}/>} />
                                
            <Route path="/new-post" 
                render={() => props.isNewPost? 
                    <Redirect to="/api/profile" />
                    : <NewPost />} />

            <Route path="/register" 
                render={() => props.isUser?
                    <Redirect to="/api/log-in" />
                    : <Register />
            }/>

            <Route exact path="/article/:id" component={ArticleDetail} />

            <Route exact path="/profile/:username"
                render={() => 
                    <Profile articlesUpdate={props.articlesList}
                        {...props}/>} />

            <Route path="/tag/:tags" component={ArticlesWithPopularTags} />

            <Route exact path="/profile/edit/:id" 
                render={(history) => 
                    <EditPost history={history}
                        articlesUpdate={props.articlesList}/>
            } />

            <Route path="/log-in" 
                render={() => props.isLogIn? 
                    <Redirect to="/api/profile" />
                    : <LogIn />
            }/>

            <Route path="/setting" component={Setting}/>
        </div>
    )
}

export default routePath;

Route.propTypes = {
    isNewPost: PropTypes.bool,
    allPosts: PropTypes.arrayOf(PropTypes.object),
    articlesList: PropTypes.arrayOf(PropTypes.string),
    isUser: PropTypes.bool,
    isLogIn: PropTypes.bool,    
}