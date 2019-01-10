import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import "./Setting.css";

class Setting extends React.Component {
    avatarRef = React.createRef();
    userNameRef = React.createRef();
    bioRef = React.createRef();
    emailRef = React.createRef();
    passwordRef = React.createRef();
    passwordConfRef = React.createRef();

    handleUpdateUser = (e) => {
        e.preventDefault();

        const data = {
            avatarRef: this.avatarRef.current.value,
            userNameRef: this.userNameRef.current.value,
            bioRef: this.bioRef.current.value,
            emailRef: this.emailRef.current.value,
            passwordRef: this.passwordRef.current.value,
            passwordConfRef: this.passwordConfRef.current.value
        }

        axios.put(`/setting/${localStorage.getItem("author")}`, {data})
            .then (res => {
                console.log(res.data);
                this.props.history.push("/");
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="Setting">
                <form onSubmit={this.handleUpdateUser}>
                    <div className="SettingWrapper">
                        <h1>Your Setting</h1>
                        <input  type="url"
                                className="Avatar"
                                ref={this.avatarRef}
                                placeholder="URL of profile picture"/>

                        <input  type="text"
                                className="UserName"
                                ref={this.userNameRef}
                                placeholder="Your Username"/>

                        <textarea   name="bio"
                                    cols="30" rows="10" 
                                    ref={this.bioRef}
                                    placeholder="Short bio about you"></textarea>

                        <input  type="email"
                                className="Email"
                                ref={this.emailRef}
                                placeholder="Email"/>

                        <input  type="password"
                                className="Password"
                                ref={this.passwordRef}
                                placeholder="Password"/>

                        <input  type="password"
                                className="PasswordConf"
                                ref={this.passwordConfRef}
                                placeholder="Password Confirm"/>

                        <Button variant="contained"
                            color="secondary"
                            type="submit"
                            value="POST"> <strong>UPDATE SETTING</strong> </Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Setting;