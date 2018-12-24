import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import RoutePath from './Route';
import NavBar from './NavBar';
import axios from 'axios';
import './App.css';

export default class App extends Component {
    state={
        data: [],
        loading: false,
        message: '',
        articles: [],
        isUser: false,
        isLogIn: false,
        isNewPost: false
    }
    
    componentDidMount = () => {
        let user = {};

        //get data from sessionStorage for not losing data after refreshing page
        const email = sessionStorage.getItem('email');
        const password = sessionStorage.getItem('password');
        const token = sessionStorage.getItem('token');
        if( email && password) {
            user.email = email;
            user.password = password;

            axios.post('/api/log-in', {user})
                .then(res => {
                    console.log(this.props)
                    let post = {...this.state.post};
                    let articles = [...this.state.articles];
                    console.log(res.data);
                    if (res.data.success) {
                        post.author = res.data.package.username;
                        post.email = res.data.package.email;
                        articles = res.data.package.collection.reverse();
                        this.setState({ token: token,
                                        articles: articles,
                                        isLogIn: true, 
                                        isUser: true,
                                        post: post,
                                        loading: false });
                    }                         
                }).catch(error => console.log(error));
        }

        axios.get('/api/posts')
            .then( res => {
                console.log(res.data)
                this.setState({ data: res.data,
                                user: user });
                if ( email && password ) {
                    this.setState({ isLogIn: true,
                                    isUser: true })
                }
            }).catch(error => console.log(error));
    }

    handleLogOut = () => {
        let payload = {
            user: '',
            token: ''
        };
        this.setState({ isUser: false, 
                        isLogIn: false, 
                        token: '',
                        isNewPost: false,
                        articles: [] });
        window.sessionStorage.clear();
        axios.post('/api/log-out', payload)
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
                            onLogInClicked={this.handleLogIn}
                            isUser={this.state.isUser}
                            loading={this.state.loading}
                            isLogIn={this.state.isLogIn}
                            articlesList={this.state.articles}
                            allPosts={this.state.data}
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