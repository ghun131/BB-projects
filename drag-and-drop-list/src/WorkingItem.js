import React from 'react';
import './WorkingItem.css';

const WorkingItem = (props) => {
    return (
        <div>
            <h5 
                draggable="true" 
                className="WorkingItem"
                onDragStart={props.dragTag}
                >
                {props.data.title}</h5>
        </div>
    )
}

export default WorkingItem;