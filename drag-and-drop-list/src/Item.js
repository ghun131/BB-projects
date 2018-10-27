import React from 'react';
import './Item.css';

import Types from 'prop-types'

const Item = (props) => {
    return (
        <div>
            <h5 
                draggable="true" 
                className="Item"
                onDragStart={props.dragTag}
                >
                {props.data.title}</h5>
        </div>
    )
}

export default Item;

Item.propTypes = {
    draggable: Types.bool,
    className: Types.string,
    onDragStart: Types.func,
    title: Types.string
}