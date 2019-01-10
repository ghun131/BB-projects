import React from 'react';
import "./NavBar.css";

import { Link } from 'react-router-dom';

const NavBar = (props) => {
    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <div>
            <ul style={{ color: "#3F3F3F", position: "relative"}}>
                <li className="Logo">
                    <Link to="/" 
                        style={{color: "#292929"}}
                        onClick={refreshPage}>Blog Me li</Link>
                </li>
                <div style={{ display: "inline-block", right: "0", position: "absolute", top:"50%", transform: "translate(0, -50%)" }}>
                    <li className="Search">
                        <i className="fas fa-search"></i>
                    </li>
                    <li className="Bell">
                        <i className="far fa-bell"></i>
                    </li>
                    <li className="Upgrade">Upgrade</li>
                    <li className="Profile"><i className="fas fa-user"></i>
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
                                        <Link to={`/profile/${localStorage.getItem("author")}`}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li><Link to="/new-post" onClick={props.newPost}>New Post</Link></li>
                                    <li><Link to="/setting" >Setting</Link></li>
                                </div>
                            : ''}
                        </ul>
                    </li>
                </div>
            </ul>
            <ul>
                <li><Link to="/" onClick={refreshPage}>HOME</Link> </li>
                <li>
                    <a>THE NEW NEW</a>
                </li>
                <li>
                    <a>CULTURE</a>
                </li>
                <li>
                    <a>TECH</a>
                </li>
                <li>
                    <a>STARTUPS</a>
                </li>
                <li>
                    <a>SELF</a>
                </li>
                <li>
                    <a>POLITICS</a>
                </li>
                <li>
                    <a>DESIGN</a>
                </li>
                <li>
                    <a>HEALTH</a>
                </li>
                <li>
                    <a>POPULAR</a>
                </li>
                <li>
                    <a>COLLECTIONS</a>
                </li>
                <li>
                    <a>MORE</a>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;