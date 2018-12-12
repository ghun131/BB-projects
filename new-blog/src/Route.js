import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home'
import NewPost from './NewPost';
import Register from './Register';
import LogIn from './LogIn';
import Profile from './Profile';

const routePath = (props) => {
    return (
        <div>
            <Route exact path="/" 
                render={() => <Home user={props.isUser}
                                allPosts={props.allPosts}
                                articlesUpdate={props.articlesList}/>} />
            <Route path="/new-post" 
                render={() => props.isNewPost? 
                                <Redirect to="/profile" />
                                : <NewPost  postInfo={props.post}
                                        postChanged={props.changePost} 
                                        clickPost={props.submitPost}/>} />
            <Route path="/register" 
                render={() => props.isUser?
                                <Redirect to="/log-in" />
                                : <Register clickSubmit={props.submit}
                                changeInput={props.changed}
                                userInfo={props.user} 
                                displayMessage={props.printMessage}
                                isLoading={props.loading}/>
            }/>

            <Route path="/profile" 
                render={() => <Profile postInfo={props.post}
                                    articlesUpdate={props.articlesList}/>} />

            <Route path="/log-in" 
                render={() => props.isLogIn? 
                                <Redirect to="/profile" />
                                : <LogIn  changeInput={props.changed}
                                    userInfo={props.user}
                                    isLoading={props.loading}
                                    clickLogIn={props.logIn}
                                    displayMessage={props.printMessage}
                                    />
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
    changePost: PropTypes.func,
    submitPost: PropTypes.func,
    isUser: PropTypes.bool,
    submit: PropTypes.func,
    changed: PropTypes.func,
    user: PropTypes.objectOf(PropTypes.string),
    isLogIn: PropTypes.bool,    
    logIn: PropTypes.func,
    printMessage: PropTypes.string
}