import React from 'react';
import { Link } from 'react-router-dom';
import { Subscribe } from 'unstated';
import UserContainer from '../containers/UserContainer';

class Register extends React.Component {
    nameRef = React.createRef();
    passRef = React.createRef();
    emailRef = React.createRef();

    handleRegister = (e, doRegister) => {
        e.preventDefault();
        const data = {
            username: this.nameRef.current.value.trim(),
            password: this.passRef.current.value.trim(),
            email: this.emailRef.current.value.trim()
        }
        console.log(data)
        doRegister(data, this.props.history)
    }

    render() {
        return (
            <Subscribe to={[UserContainer]}>
                {
                    items => (
                        <div className="auth-page">
                            <div className="container page">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3 col-xs-12">
                                        <h1 className="text-xs-center">Sign up</h1>
                                        <p className="text-xs-center">
                                            <Link to="">Have an account?</Link>
                                        </p>

                                        {
                                            items.state.message ? 
                                                <ul className="error-messages">
                                                    <li>{items.state.message}</li>
                                                </ul>
                                                : ''
                                        }
                
                                        <form onSubmit={(e) => this.handleRegister(e, items.doRegister)}>
                                            <fieldset className="form-group">
                                                <input className="form-control form-control-lg" 
                                                    type="text" 
                                                    placeholder="Your Name"
                                                    ref={this.nameRef}/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input className="form-control form-control-lg" 
                                                    type="text" 
                                                    placeholder="Email"
                                                    ref={this.emailRef}/>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input className="form-control form-control-lg" 
                                                    type="password" 
                                                    placeholder="Password"
                                                    ref={this.passRef}/>
                                            </fieldset>
                                            <button className="btn btn-lg btn-primary pull-xs-right">
                                                Sign up
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
            </Subscribe>
        )
    }
}

export default Register;