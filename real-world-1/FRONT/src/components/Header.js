import React from 'react';
import { Link } from 'react-router-dom';
import { Subscribe } from 'unstated';
import UserContainer from '../containers/UserContainer';

const Header = () => {
    return (
        <Subscribe to={[UserContainer]}>
            {
                items => (
                    <div>
                        <nav className="navbar navbar-light">
                            <div className="container">
                                <Link className="navbar-brand" to="/">conduit</Link>
                                <ul className="nav navbar-nav pull-xs-right">
                                <li className="nav-item">
                                    {/* Add "active" class when you're on that page"  */}
                                    <Link className="nav-link active" to="/">Home</Link>
                                    
                                </li>
                                {
                                    items.state.isLogin ? 
                                        <span>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/editor">
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <i className="ion-compose"></i>&nbsp;New Post
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/settings">
                                                <i className="ion-gear-a"></i>&nbsp;Settings
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/profile">{localStorage.getItem("author")}</Link>
                                            </li>
                                        </span>
                                    :
                                        <span>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <i className="ion-compose"></i>&nbsp;Sign in
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/register">
                                                <i className="ion-compose"></i>&nbsp;Sign up
                                                </Link>
                                            </li>
                                        </span>
                                }
                                </ul>
                            </div>
                        </nav>
                    </div>
                )
            }
        </Subscribe>
    )
}

export default Header;