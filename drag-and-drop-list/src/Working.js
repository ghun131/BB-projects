import React from 'react';
import './Working.css';

import WorkingItem from './WorkingItem';

const Working = (props) => {
    return (
        <div className='DropBox'
            onDragOver={props.dragOver} 
            onDrop={props.drop}>
        <h1>Working</h1>
            {props.data.working.map((item) => 
                <WorkingItem 
                    key={item.id} 
                    id={item.id}
                    data={item} 
                    dragTag={(e) => props.dragStart(e, item.id)}/>)}
        </div>
    )
}

export default Working;