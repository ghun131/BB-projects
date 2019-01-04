import React from 'react'
import { Link, Route } from 'react-router-dom';

const ProfileNavBar = (props) => {
    return (
        <div style={{ marginTop: "30px" }}>
            <Link to={`/profile/${localStorage.getItem("author")}`}>
                Your posts
            </Link>
            <hr/>
        </div>
    )
}

export default ProfileNavBar;