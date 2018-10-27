import React from 'react';
import './Heading.css';
import Types from 'prop-types';
import Item from './Item';

const Heading = (props) => {
    const data = props.data
    return (
        <div className='DropBox'
            data-list={props.list}
            onDragOver={props.dragOver} 
            onDrop={props.drop}>
        <h1>{props.title}</h1>
            {data.map((item) => 
                <Item 
                    key={item.id} 
                    id={item.id}
                    data={item} 
                    dragTag={(e) => props.dragStart(e, item.id)}/>)}
        </div>
    )
}

export default Heading;

Heading.propTypes = {
    title: Types.string,
    id: Types.string,
    className: Types.string,
    onDragOver: Types.func,
    onDrop: Types.func
}