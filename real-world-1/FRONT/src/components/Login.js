import React from 'react';
import { Subscribe } from 'unstated';
import { Link } from 'react-router-dom';
import UserContainer from '../containers/UserContainer';

class Login extends React.Component {
    emailRef = React.createRef()
    passRef = React.createRef()

    handleSubmit = (e, doLogin) => {
        e.preventDefault();

        const email = this.emailRef.current.value.trim();
        const password = this.passRef.current.value.trim();
        doLogin(email, password, this.props.history);
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
                                    <h1 className="text-xs-center">Sign in</h1>
                                    <p className="text-xs-center">
                                        <Link to="/register">Need an account?</Link>
                                    </p>
                                    {
                                        items.state.message ? 
                                            <ul className="error-messages">
                                    
                                                <li>{items.state.message}</li>
                                            </ul>
                                            : ''
                                    }

                                    <form onSubmit={(e) => this.handleSubmit(e, items.doLogin)}>
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
                                            Sign in
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

export default Login;