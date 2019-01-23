import React from 'react'
import { Link } from 'react-router-dom';

const ProfileNavBar = (props) => {
    return (
        <div style={{ marginTop: "30px" }}>
            <Link to={`/profile/${localStorage.getItem("author")}`}
                className="nav-link router-link-exact-active active">
                    Your posts
            </Link>
            &nbsp; &nbsp;
            <Link to={`/profile/${localStorage.getItem("author")}/love`}
                className="nav-link router-link-exact-active active">
                    Favourite articles
            </Link>
                
            <hr/>
        </div>
    )
}

export default ProfileNavBar;