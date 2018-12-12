import React from 'react';
import PropTypes from 'prop-types';
import './Register.css';
import Spinner from './Spinner';

const Register = (props) => {
        let content;
        if (props.isLoading) {
                content = <Spinner />
        } else {
                content = 
                <div className="Register">
                        <h1>Sign up</h1>
                        <form onSubmit={props.clickSubmit}>
                        
                                <div className="Wrapper">
                                <label htmlFor="id">User Name (or ID): </label>
                                <input  type="text" 
                                        name="username" 
                                        value={props.userInfo.username}
                                        onChange={props.changeInput}/>

                                <label htmlFor="email">Email Adress: </label>
                                <input  type="email" 
                                        name="email"
                                        value={props.userInfo.email}
                                        onChange={props.changeInput}/>

                                <label htmlFor="pass">Password that you want: </label>
                                <input  type="password" 
                                        name="password"
                                        value={props.userInfo.password}
                                        onChange={props.changeInput}/>

                                <label htmlFor="age">Confirm your password: </label>
                                <input  type="password" 
                                        name="passwordConf"
                                        value={props.userInfo.passwordConf}
                                        onChange={props.changeInput}/>
                                <div className="Message">{props.displayMessage}</div>
                                </div>

                                <input  style={{width: '100px', margin: '10px auto'}} 
                                        type="submit" 
                                        value="Sign Up!"/>
                        </form>
        </div>
        }

    return content;
}

export default Register;

Register.propTypes = {
        isLoading: PropTypes.bool,
        clickSubmit: PropTypes.func,
        userInfo: PropTypes.objectOf(PropTypes.string),
        changeInput: PropTypes.func,
        displayMessage: PropTypes.string
}