import React from 'react';
import './Done.css';

import DoneItem from './DoneItem';

const Done = (props) => {
    return (
        <div className='DropBox'
            onDragOver={props.dragOver} 
            onDrop={props.drop}>
        <h1>Done</h1>
            {props.data.done.map((item) => 
                <DoneItem 
                    key={item.id} 
                    id={item.id}
                    data={item}
                    dragTag={(e) => props.dragStart(e, item.id)}/>)}
        </div>
    )
}

export default Done;