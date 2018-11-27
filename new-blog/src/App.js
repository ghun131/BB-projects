import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import RoutePath from './Route';
import NavBar from './NavBar';
import axios from 'axios';
import './App.css';

export default class App extends Component {
    state={
        token: '',
        user: {
            email: '',
            username: '',
            password: '',
            passwordConf: ''
        },
        post: {
            author: '',
            email: '',
            title: '',
            content: ''            
        },
        message: '',
        articles: [],
        isUser: false,
        isLogIn: false,
        isNewPost: false
    }

    handleRegister = (e) => {
        e.preventDefault();

        const user = {... this.state.user}
        axios.post('http://localhost:3000/register', {user})
            .then( res => {
                console.log(res.data);
                this.setState({ isUser: res.data.success, message: res.data.message });
            }).catch( error => console.log(error) );
    }

    handleLogOut = () => {
        this.setState({ isUser: false, 
                        isLogIn: false, 
                        token: '', 
                        isNewPost: false,
                        articles: [] });
    }

    handleChange = () => {
        const user = {...this.state.user};
        user[event.target.name] = event.target.value;
        this.setState({user: user});
    }

    handleLogIn = (e) => {
        e.preventDefault();

        const user = {...this.state.user}
        const post = {...this.state.post}
        let articles = [...this.state.articles];
        axios.post('/log-in', {user})
            .then(res => {
                console.log(res.data);
                if (res.data.username) {
                    post.author = res.data.username;
                    post.email = res.data.email;
                    articles = res.data.collection.reverse();
                    this.setState({ token: res.data.token,
                                    articles: articles,
                                    isLogIn: true, 
                                    isUser: true,
                                    message: res.data.message, 
                                    post: post});
                } else {
                    this.setState({ message: res.data.message })
                }
            }).catch(error => console.log(error));
        console.log('log in');
    }

    handlePost = () => {
        const post = {...this.state.post};
        post[event.target.name] = event.target.value;
        console.log(this.state.post.author);
        this.setState({ post: post });
    }

    handleSubmitPost = (e) => {
        e.preventDefault();

        const post = {...this.state.post}
        console.log('submit post');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token
        axios.post('/new-post', {post})
            .then(res => {
                console.log(res.data);
                let articles = [...this.state.articles];
                articles = res.data.reverse();
                this.setState({ isNewPost: true,
                                articles: articles });
            }).catch(error => console.log(error));
    }

    handleClickNewPost = () => {
        const post = {...this.state.post}
        post.title = '';
        post.content = '';
        this.setState({ isNewPost: false, post: post });
    }

    render() {
        return (
            <div className="App">
            <header className="Nav">
                <nav>
                    <NavBar isLogIn={this.state.isLogIn}
                            isUser={this.state.isUser}
                            logOut={this.handleLogOut}
                            newPost={this.handleClickNewPost}/>
                </nav>
            </header>
                <RoutePath  submit={this.handleRegister}
                            changed={this.handleChange}
                            user={this.state.user}
                            logIn={this.handleLogIn}
                            isUser={this.state.isUser}
                            isLogIn={this.state.isLogIn}
                            articlesList={this.state.articles}
                            post={this.state.post}
                            isNewPost={this.state.isNewPost}
                            changePost={this.handlePost}
                            submitPost={this.handleSubmitPost}
                            printMessage={this.state.message}/>
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('root'));