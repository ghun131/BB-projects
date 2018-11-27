import React from 'react';
import PropTypes from 'prop-types';
import './LogIn.css';

const LogIn = (props) => {
    return (
        <div className="LogIn">
            <h1>Log In</h1>
            <form onSubmit={props.clickLogIn}>
                <div className="Wrapper">

                <label htmlFor="id">Email: </label>
                <input  type="text" 
                        name="email"
                        value={props.userInfo.email}
                        onChange={props.changeInput}/>

                <label htmlFor="pass">Password: </label>
                <input  type="password" 
                        name="password"
                        value={props.userInfo.password}
                        onChange={props.changeInput}/>
                
                <input style={{display: "inline", width: "10%"}} type="checkbox"/> Forget your password?
                <div className="Message">{props.displayMessage}</div>
                
                </div>
                <input  type="submit"
                        style={{width: '100px', margin: '10px auto', color: 'black'}} 
                        value="Log In"/>
            </form>

            
        </div>
    )
}

export default LogIn;

LogIn.propTypes = {
    clickLogIn: PropTypes.func,
    userInfo: PropTypes.objectOf(PropTypes.string),
    changeInput: PropTypes.func,
    displayMessage: PropTypes.string
}