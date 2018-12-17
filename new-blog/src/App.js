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
        data: [],
        loading: false,
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
    
    componentDidMount = () => {
        const user = {...this.state.user};

        //get data from sessionStorage for not losing data after refreshing page
        const email = sessionStorage.getItem('email');
        const password = sessionStorage.getItem('password');
        const token = sessionStorage.getItem('token');
        if( email && password) {
            user.email = email;
            user.password = password;

            axios.post('/api/log-in', {user})
                .then(res => {
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
                                        message: res.data.message, 
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
            })
    }

    // A million handlers that kill your eyes
    handleRegister = (e) => {
        e.preventDefault();

        const user = {... this.state.user};
        this.setState({ loading: true });
        if (user.email === '' || user.password === '') {
                this.setState({ message: 'Don\' leave anything empty!!!!',
                                loading: false })
            setTimeout(() => this.setState({ message: '' }), 3000);
        } else {
            axios.post('/api/register', {user})
                .then( res => {
                    console.log(res.data);
                    this.setState({ isUser: res.data.success, 
                                message: res.data.message,
                                loading: false })
                    setTimeout(() => {
                        this.setState({ message: '' });
                    }, 3000);
                }).catch( error => console.log(error) );
        }        
    }

    handleLogOut = () => {
        const user = {...this.state.user};
        user.email = '';
        user.password = '';
        this.setState({ isUser: false, 
                        isLogIn: false, 
                        token: '',
                        isNewPost: false,
                        user: user,
                        articles: [] });
        window.sessionStorage.clear();
    }

    handleChange = (e) => {
        const user = {...this.state.user};
        user[event.target.name] = event.target.value;
        this.setState({user: user});
    }

    handleLogIn = (e) => {
        e.preventDefault();

        const user = {...this.state.user}
        this.setState({ loading: true });
        axios.post('/api/log-in', {user})
            .then(res => {
                const post = {...this.state.post}
                let articles = [...this.state.articles];
                console.log(res.data);
                if (res.data.success) {
                    post.author = res.data.package.username;
                    post.email = res.data.package.email;
                    articles = res.data.package.collection.reverse();
                    sessionStorage.setItem('email', this.state.user.email);
                    sessionStorage.setItem('password', this.state.user.password);
                    sessionStorage.setItem('token', res.data.package.token)
                    this.setState({ token: res.data.package.token,
                                    articles: articles,
                                    isLogIn: true, 
                                    isUser: true,
                                    message: res.data.message, 
                                    post: post,
                                    loading: false });
                } else {
                    this.setState({ message: res.data.message,
                                    loading: false })
                }
                setTimeout(() => {
                    this.setState({ message: '' });
                }, 5000);
            })
            .catch(error => console.log(error));
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
        const data = [...this.state.data]
        this.setState({ loading: true });
        console.log('submit post');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token
        axios.post('/api/new-post', {post})
            .then(res => {
                console.log(res.data);
                let articles = [...this.state.articles];
                if (res.data.message) {
                    this.setState({ message: res.data.message })
                    setTimeout(() => {
                        this.setState({ message: ''})
                    }, 4000)
                } else {
                    console.log(articles[0])
                    articles = res.data.reverse();
                    data.push(post);
                    this.setState({ isNewPost: true,
                                    articles: articles,
                                    loading: false,
                                    data: data });
                }
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
                            newPost={this.handleClickNewPost}
                            userInfo={this.state.user}/>
                </nav>
            </header>
                <RoutePath  submit={this.handleRegister}
                            changed={this.handleChange}
                            user={this.state.user}
                            logIn={this.handleLogIn}
                            isUser={this.state.isUser}
                            loading={this.state.loading}
                            isLogIn={this.state.isLogIn}
                            articlesList={this.state.articles}
                            allPosts={this.state.data}
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