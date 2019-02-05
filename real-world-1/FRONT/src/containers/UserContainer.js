import React from 'react';
import { Container } from 'unstated';
import axios from 'axios';

class UserContainer extends Container {
    state={
        isLogin: false,
        message: '',
        following: false
    };

    takeLastWord = (pathname) => {
        let arr = pathname.split("/");
        let lastWord = arr[arr.length - 1].trim();
        return lastWord;
    }

    saveLocalStorage = (data) => {
        if(data.token) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('author', data.username);
            localStorage.setItem('bio', data.bio);
            localStorage.setItem('picUrl', data.avaUrl);
            localStorage.setItem('loveArticles', data.loveArticles);
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.password);
            localStorage.setItem('following', data.following);
        }
    }

    doLogin = (email, password, history) => {
        if (email && password) {
            const user = {
                email: email,
                password: password
            }

            console.log('send to server', user)
            axios.post('api/login', {user})
                .then(res => {
                    console.log('Log in', res.data);
                    this.setState({ isLogin: res.data.success , message: res.data.message});
                    if (res.data.success) {
                        this.saveLocalStorage(res.data.package)
                        history.push('/');
                    }
                }).catch(err => console.log(err) )
        }
        else {
            this.setState({ message: 'Invalid email or password'});
        }
            setTimeout(() => {
                this.setState({ message: '' });
            }, 3000);
    }

    doLogout = (history) => {
        const payload = {
            user: '',
            token: ''
        };
        this.setState({ isLogin: false })
        window.localStorage.clear();
        axios.post('api/logout', payload)
        history.push("/")
    }

    doRegister = (data, history) => {
        const payload = {
            username: data.username,
            email: data.email,
            password: data.password,
        }
        console.log(payload)
        if (payload.email === '' || payload.password === '') {
            this.setState({ message: 'Don\' leave anything empty!!!!'})
            setTimeout(() => this.setState({ message: '' }), 3000);
        } else  {
            axios.post('/register', {payload})
                .then( res => {
                    this.setState({ message: res.data.message, isLogin: res.data.success })
                    setTimeout(() => this.setState({ message: '' }), 3000);
                    if (res.data.success) {
                        this.saveLocalStorage(res.data.package);
                        history.push('/')
                    }
                }).catch( error => console.log(error) );
        }
    }

    editProfile = (items, history) => {
        const data = {
            avaUrl: items.avaUrl,
            biography: items.biography,
            email: items.email
        }

        axios.put(`/profile/setting/${localStorage.getItem("author")}`, {data})
            .then (res => {
                console.log(res.data);
                localStorage.setItem("picUrl", data.avaUrl)
                localStorage.setItem("bio", data.biography)
                history.push("/");
            })
            .catch(error => console.log(error));
    }

    checkFollowingUser = (pathname) => {
        let user = this.takeLastWord(pathname).trim();

        if (localStorage.getItem("following").includes(user)) {
            this.setState({ following: true });
        } else {
            this.setState({ following: false });
        }
    }

    followUser = (pathname) => {
        let user = this.takeLastWord(pathname).trim();

        let following = []
        if (localStorage.getItem("following")) {
            following = localStorage.getItem("following").split(",");
            console.log('following array', following);
        }

        let payload = {
            author: localStorage.getItem("author"),
            following: following
        }

        let isFollowed = payload.following.filter( f => f === user);
        console.log('isFollowed', isFollowed);

        if (!isFollowed[0]) {
            payload.following.push(user);
            console.log('following', payload.following);
            axios.post(`/profile/${user}`, payload)
                .then( res => {
                    this.setState({ following: true });
                    console.log(payload.following)
                    localStorage.setItem("following", payload.following);
                })
        } else {
            let index = payload.following.indexOf(user);
            payload.following.splice(index, 1)
            console.log('unfollowing', payload.following);
            axios.post(`/profile/${user}`, payload)
                .then( res => {
                    this.setState({ following: false })
                    localStorage.setItem("following", payload.following);
                })
        }
    }
}

let container = new UserContainer();
export default container;