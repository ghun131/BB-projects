import React from 'react';
import { Container } from 'unstated';
import axios from 'axios';

class UserContainer extends Container {
    state={
        isLogin: false,
        message: ''
    };

    saveLocalStorage = (data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('author', data.username);
        localStorage.setItem('bio', data.bio);
        localStorage.setItem('picUrl', data.avaUrl);
        localStorage.setItem('loveArticles', data.loveArticles);
        localStorage.setItem('email', data.email);
        localStorage.setItem('password', data.password);
    }

    doLogin = (email, password, history) => {
        if (email && password) {
            const user = {
                email: email,
                password: password
            }
            axios.post('api/login', {user})
                .then(res => {
                    console.log(res.data);
                    this.setState({ isLogin: res.data.success , message: res.data.message});
                    this.saveLocalStorage(res.data.package)
                    history.push('/');
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
                    this.setState({ message: res.data.message })
                    setTimeout(() => this.setState({ message: '' }), 3000);
                    if (res.data.success) {
                        this.saveLocalStorage(res.data.package);
                        history.push('/')
                    }
                }).catch( error => console.log(error) );
        }
    }

    editProfile = () => {

    }
}

export default UserContainer;