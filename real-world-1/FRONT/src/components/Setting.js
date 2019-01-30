import React from 'react';
import { Subscribe } from 'unstated';
import UserContainer from '../containers/UserContainer';


class Setting extends React.Component {
    avaUrlRef = React.createRef()
    bioRef = React.createRef()
    emailRef = React.createRef()

    handleLogout = (e, doLogout) => {
        e.preventDefault();
        doLogout(this.props.history);
    }

    handleSetting = (e, editProfile) => {
        e.preventDefault();

        const formData = {
            avaUrl: this.avaUrlRef.current.value.trim(),
            biography: this.bioRef.current.value.trim(),
            email: this.emailRef.current.value.trim(),
        }
        console.log(formData)

        editProfile(formData, this.props.history)
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
            
                                <form onSubmit={(e) => this.handleSetting(e, items.editProfile)}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control" 
                                            type="text"
                                            defaultValue={localStorage.getItem("picUrl")}
                                            ref={this.avaUrlRef}
                                            placeholder="URL of profile picture" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" 
                                            type="text"
                                            defaultValue={localStorage.getItem("author")}
                                            placeholder="Your Name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea className="form-control form-control-lg" 
                                            rows="8" 
                                            ref={this.bioRef}
                                            placeholder="Short bio about you">
                                                {
                                                    localStorage.getItem("bio") ? 
                                                    localStorage.getItem("bio") : ""
                                                }
                                        </textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input 
                                            className="form-control form-control-lg" 
                                            ref={this.emailRef}
                                            defaultValue={localStorage.getItem("email")}
                                            type="text" 
                                            placeholder="Email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" 
                                            disable="true"
                                            type="password" 
                                            placeholder="Password" />
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