import React from 'react';
import { Container } from 'unstated';
import axios from 'axios';

class UserContainer extends Container {
    state={
        isLogin: false,
        message: ''
    };

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
                    localStorage.setItem('token', res.data.package.token)
                    localStorage.setItem('author', res.data.package.username);
                    localStorage.setItem('bio', res.data.package.bio);
                    localStorage.setItem('picUrl', res.data.package.avaUrl);
                    localStorage.setItem('loveArticles', res.data.package.loveArticles);

                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
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

    doLogout
    doRegister
    editProfile
}

export default UserContainer;