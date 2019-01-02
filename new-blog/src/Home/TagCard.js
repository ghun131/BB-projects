import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

const TagCard = (props) => {
    return (
        <Link to={`/profile/${localStorage.getItem("author") + "/" + props._id}`} style={{display: "inline-flex"}}>
            <Chip style={{marginRight: "5px"}}
                    label={props._id}
                    href={"#" + props._id}
                    variant="outlined"
                    clickable/>
        </Link>
    )
}

export default TagCard;