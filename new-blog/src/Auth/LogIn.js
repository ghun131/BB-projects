import React, { Component } from 'react';
import './LogIn.css';
import Spinner from '../Spinner';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class LogIn extends Component {
    emailRef = React.createRef()
    passRef = React.createRef()

    state = {
        message: '',
        loading: false
    }

    componentDidMount() {
        const email = sessionStorage.getItem('email')
        if (email) {
            const user = {
                email: email,
                password: sessionStorage.getItem('password')
            }
            this.postUserData(user);            
        }
    }

    postUserData = (user) => {
        axios.post('/api/log-in', {user})
            .then(res => {
                if (res.data.success) {
                    sessionStorage.setItem('email', user.email);
                    sessionStorage.setItem('password', user.password);
                    sessionStorage.setItem('author', res.data.package.username);
                    sessionStorage.setItem('token', res.data.package.token);
                    console.log(res.data.package)
                    this.setState({ 
                        message: res.data.message, 
                        loading: false 
                    });
                    this.props.history.push('/');
                    window.location.reload();
                } else {
                    this.setState({ 
                        message: res.data.message,
                        loading: false
                    })
                }
                setTimeout(() => {
                    this.setState({ message: '' });
                }, 5000);
            }).catch(err => console.log(err))
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.emailRef.current.value,
            password: this.passRef.current.value,
        }
        
        this.setState({ loading: true })
        console.log('log in!');
        
        this.postUserData(user);
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Spinner />
        } else {
            content = 
                <div className="LogIn">
                    <h1>Log In</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="Wrapper">

                        <label htmlFor="id">Email: </label>
                        <input  type="text" 
                                name="email"
                                defaultValue={sessionStorage.getItem('email')}
                                ref={this.emailRef}/>

                        <label htmlFor="pass">Password: </label>
                        <input  type="password" 
                                name="password"
                                defaultValue={sessionStorage.getItem('password')}
                                ref={this.passRef}/>
                        
                        <input style={{display: "inline", width: "10%"}} type="checkbox"/> Forget your password?
                        <div className="Message">{this.state.message}</div>
                        
                        </div>
                        <Button 
                            variant="contained"
                            color="secondary"
                            type="submit"
                            value="LOG IN">
                            <strong>LOG IN</strong>
                        </Button>
                    </form>
                </div>
        }
        return content;
    }
}

export default withRouter(LogIn);