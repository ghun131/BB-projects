import React from 'react';
import { Container } from 'unstated';
import axios from 'axios';

class UserContainer extends Container {
    state={
        isLogin: false,
        message: ''
    };

    saveLocalStorage = (data) => {
        if(data.token) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('author', data.username);
            localStorage.setItem('bio', data.bio);
            localStorage.setItem('picUrl', data.avaUrl);
            localStorage.setItem('loveArticles', data.loveArticles);
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.password);
        }
    }

    doLogin = (email, password, history) => {
        if (email && password) {
            const user = {
                email: email,
                password: password
            }
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

    doLogout = () => {
        const payload = {
            user: '',
            token: ''
        };
        this.setState({ isLogin: false })
        window.localStorage.clear();
        axios.post('api/logout', payload)
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

    // followOthers
}

let container = new UserContainer();
export default container;