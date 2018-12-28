import React from 'react'
import { Link } from 'react-router-dom';
import Profile from './Profile';

const ProfileNavBar = (props) => {
    return (
        <div>
            <Link to="/profile">Your posts</Link>
            <hr/>
        </div>
    )
}

export default ProfileNavBar;