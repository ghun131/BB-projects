import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

const TagCard = (props) => {
    return (
        <Link to={`/profile/${localStorage.getItem("author") + "/posts/" + props._id}`} 
            style={{display: "inline-flex", padding: "5px"}}>
            <Chip style={{padding: "0", border: "1px solid cyan"}}
                    label={props._id}
                    href={"#" + props._id}
                    clickable/>
        </Link>
    )
}

export default TagCard;