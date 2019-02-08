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

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
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

        console.log('check follow user')

        if (localStorage.getItem("following") && localStorage.getItem("following").includes(user)) {
            this.setState({ following: true });
            return true;
        } else {
            this.setState({ following: false });
            return false;
        }
    }
}

let container = new UserContainer();

export default container;