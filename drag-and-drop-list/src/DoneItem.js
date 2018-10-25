import React from 'react';
import './DoneItem.css';

const DoneItem = (props) => {
    return (
        <div>
            <h5 draggable="true" 
                className="DoneItem"
                onDragStart={props.dragTag}>
                {props.data.title}
            </h5>
        </div>
    )
}

export default DoneItem;