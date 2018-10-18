import React, { Component } from 'react';
import './TaskCard.css';
import Types from 'prop-types';

class TaskCard extends Component {
    onChange(done, value) {
        this.props.onChange(done, value)
    }

    render() {
        return (
            <div className='CardWrapper'>
                <div className='TaskCard'>
                    <div>
                        <input  type="checkbox" 
                                checked={this.props.done}
                                onChange={e => this.props.onChange('done', e.target.checked)}/>
                        <span   className={this.props.done ? "Done" : ""}>{this.props.title}</span>
                    </div>
                    <select name="priority" 
                            className="Priority"
                            onChange={e => this.props.onChange('priority', e.target.value)}>
                        {
                            ['Low', 'Normal', 'High'].map((el, index) => {
                                return <option key={index + el} value={index + 1}>{el}</option>
                            })
                        }
                    </select>
                </div>
                <div className="XButton" onClick={this.props.removeItem}>
                    <i className="far fa-times-circle"></i>
                </div>
            </div>
        )
    }
}

TaskCard.propTypes = {
    title: Types.string.isRequired,
    done: Types.bool.isRequired,
    priority: Types.number.isRequired,
    removeItem: Types.func.isRequired,
    onChange: Types.func.isRequired
}

export default TaskCard;