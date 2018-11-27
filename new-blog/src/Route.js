import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home'
import NewPost from './NewPost';
import Register from './Register';
import LogIn from './LogIn';


const routePath = (props) => {
    return (
        <div>
            <Route exact path="/" render={() => <Home   user={props.isUser}
                                                        articlesUpdate={props.articlesList}/>} />
            <Route path="/new-post" render={() => props.isNewPost? 
                                                    <Redirect to="/" />
                                                    : <NewPost  postInfo={props.post}
                                                            postChanged={props.changePost} 
                                                            clickPost={props.submitPost}/>} />
            <Route path="/register" render={() => props.isUser?
                                                    <Redirect to="/log-in" />
                                                    : <Register clickSubmit={props.submit}
                                                                changeInput={props.changed}
                                                                userInfo={props.user} 
                                                                displayMessage={props.printMessage}/>}/>
            <Route path="/log-in" render={() => props.isLogIn? 
                                                    <Redirect to="/" />
                                                    : <LogIn  changeInput={props.changed}
                                                        userInfo={props.user}
                                                        clickLogIn={props.logIn}
                                                        displayMessage={props.printMessage}/>}/>
        </div>
    )
}

export default routePath;

Route.propTypes = {
    isNewPost: PropTypes.bool,
    post: PropTypes.objectOf(PropTypes.string),
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