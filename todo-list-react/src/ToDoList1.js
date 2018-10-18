import React, { Component } from 'react';
import Types from 'prop-types'
import './ToDoList.css';

export default class ToDoList extends Component {
    state = {
        data: [
            { title: "Task 1", done: false, priority: 1 },
            { title: "Task 2", done: false, priority: 2 },
            { title: "Task 3", done: false, priority: 3 },
            { title: "Task 4", done: false, priority: 4 }
        ]
    }

    // onCheckboxChange = (index) => {
    //     const data = [...this.state.data]
    //     data[index].done = !this.state.data.done
    //     this.setState({ data });
    // }

    render() {
        return <ul>
            {this.state.data.map((item, index) => (
                <ToDoItem
                    key={index}
                    onChange={(key, value) => {
                        const data = [...this.state.data]
                        data[index][key] = value
                        // data[index].done = !this.state.done
                        this.setState({ data })
                        console.log(data)
                    }}
                    {...item}
                />
            ))}
        </ul>
    }
}

const priorities = [1,2,3,4,5]

class ToDoItem extends Component {
    onChange(e, value) {
        this.props.onChange(e, value)
    }

    render() {
        return <li>
            <input 
                type="checkbox"
                checked={this.props.done}
                onChange={e => this.onChange('done', e.target.checked)}
            />
            <input type="text" defaultValue={this.props.title} />
            <select
                defaultValue={this.props.priority}
            >
                {priorities.map(i => <option key={i}>{i}</option>)}
            </select>
        </li>
    }
}
ToDoItem.propTypes = {
    title: Types.string.isRequired,
    done: Types.bool.isRequired,
    priority: Types.number.isRequired,
    onChange: Types.func.isRequired
}