import React from 'react';
import "./Header.css";

import { Link } from 'react-router-dom';

const Header = (props) => {
    const refreshPage = () => {
        window.location.reload()
    }

const author = localStorage.getItem("author");

    return (
        <div className="NavBar">
            <div className="Container">
                <Link className="Logo" to="/" onClick={refreshPage}>BB Blog</Link>
                <ul style={{ float: "right"}}>
                    <li><Link to="/" className="NavLink" onClick={refreshPage}>HOME</Link></li>
                    <li>
                        { props.isUser ? 
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Link to="/new-post" className="NewPost NavLink">
                                    <i className="ion-compose"></i>&nbsp; New Post
                                </Link>
                                <Link className="Setting NavLink" to={`/profile/setting/${author}`}>
                                    <i className="ion-gear-a"></i>&nbsp; Settings
                                </Link>
                                <div className="Profile">
                                    <Link to={`/profile/${author}`}>{author}</Link>
                                    <ul className="ProfileDropDown">
                                        { !props.isUser?
                                            <li><Link to="/register">Sign up</Link></li>
                                        : '' }
                                        { props.isLogIn? 
                                            <li><Link to="/" onClick={props.logOut}>Log out</Link></li>
                                        : <li><Link to="/log-in">Log in</Link></li> }
                                        { props.isUser && props.isLogIn?
                                            <div>
                                                <li>
                                                    <Link to={`/profile/${author}`}>
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li><Link to="/new-post" onClick={props.newPost}>New Post</Link></li>
                                                <li>
                                                    <Link className="Setting" to={`/profile/setting/${author}`}>
                                                        Settings
                                                    </Link>
                                                </li>
                                            </div>
                                        : ''}
                                    </ul>
                                </div>
                            </div>
                            :
                            <div>
                                <Link className="NavLink" to="/register">Sign up</Link>
                                <Link className="NavLink" to="/log-in">Log in</Link>
                            </div>    
                        }
                    </li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;