import React from 'react';
import { Subscribe } from 'unstated';
import UserContainer from '../containers/UserContainer';


class Setting extends React.Component {

    handleLogout = (e, doLogout) => {
        e.preventDefault();
        doLogout();
    }

    render() {
        return (
            <Subscribe to={[UserContainer]}>
            {
                items => (
                        <div className="settings-page">
                            <div className="container page">
                            <div className="row">
            
                            <div className="col-md-6 offset-md-3 col-xs-12">
                                <h1 className="text-xs-center">Your Settings</h1>
            
                                <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control" type="text" placeholder="URL of profile picture" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="text" placeholder="Your Name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="text" placeholder="Email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="password" placeholder="Password" />
                                    </fieldset>
                                    <button className="btn btn-lg btn-primary pull-xs-right">
                                        Update Settings
                                    </button>
                                </fieldset>
                                </form>
                                <hr/>
                                <button className="btn btn-outline-danger"
                                    onClick={(e) => this.handleLogout(e, items.doLogout)}>
                                        Or click here to log out.
                                </button>
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

export default Setting;