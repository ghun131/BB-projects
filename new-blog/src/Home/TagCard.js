import React from 'react';
import Chip from '@material-ui/core/Chip';

const TagCard = (props) => {
    return (
        <div style={{display: "inline-flex"}}>
            <Chip style={{marginRight: "5px"}}
                    label={props._id}
                    href={"#" + props._id}
                    variant="outlined"
                    clickable/>
        </div>
    )
}

export default TagCard;