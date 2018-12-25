import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home'
import NewPost from './NewPost';
import Register from './Auth/Register';
import LogIn from './Auth/LogIn';
import Profile from './Profile';

const routePath = (props) => {
    return (
        <div>
            <Route exact path="/" 
                render={() => <Home user={props.isUser}
                                allPosts={props.allPosts}
                                articlesUpdate={props.articlesList}/>} />
            <Route path="/api/new-post" 
                render={() => props.isNewPost? 
                                <Redirect to="/api/profile" />
                                : <NewPost />} />
            <Route path="/register" 
                render={() => props.isUser?
                                <Redirect to="/api/log-in" />
                                : <Register />
            }/>

            <Route path="/api/profile" 
                render={() => <Profile postInfo={props.post}
                                    articlesUpdate={props.articlesList}/>} />

            <Route path="/log-in" 
                render={() => props.isLogIn? 
                                <Redirect to="/api/profile" />
                                : <LogIn />
            }/>
        </div>
    )
}

export default routePath;

Route.propTypes = {
    isNewPost: PropTypes.bool,
    loading: PropTypes.bool,
    post: PropTypes.objectOf(PropTypes.string),
    allPosts: PropTypes.arrayOf(PropTypes.object),
    articlesList: PropTypes.arrayOf(PropTypes.string),
    isUser: PropTypes.bool,
    user: PropTypes.objectOf(PropTypes.string),
    isLogIn: PropTypes.bool,    
    printMessage: PropTypes.string
}