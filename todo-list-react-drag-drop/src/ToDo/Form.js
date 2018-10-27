import React from 'react';
import './Form.css';

const Form = (props) => {
    return (
        <div className='Form'>
            <input className="Title" 
                    ref={props.inputRef}
                    type='text' 
                    name='task' 
                    onChange={props.changed}/>
            <button className="AddTaskButton"
                    onClick={props.clicked}>Add task</button>
            <button className='Cancel'
                    onClick={props.clicked}>Cancel</button>
        </div>
    )
}

export default Form;