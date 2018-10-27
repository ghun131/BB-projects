import React from 'react';
import './Done.css';

const Done = (props) => {
    return (
        <div className='DropBox'
            onDragOver={props.dragOver} 
            onDrop={props.drop}>
        <h1>Done</h1>
        {props.data.map(item => {  return <TaskCard    
                                    key={item.id}
                                    onClick={this.props.removeItem}
                                    dragStart={(e) => this.handleDragStart(e, item.id)}
                                    onChange={(key, value) => {
                                        const data = [...this.state.data]
                                        if(key === 'done') {
                                            data[index][key] = value
                                            this.setState({ data }, () => console.log(data))
                                        } else if (key === 'priority') {
                                            const prio = parseInt(value)
                                            data[index][key] = prio;
                                            data.sort((a,b) => {
                                                return b.priority - a.priority
                                            });
                                            this.setState({ data })
                                        }
                                    }}/>;
                                })}
        </div>
    )
}

export default Done;