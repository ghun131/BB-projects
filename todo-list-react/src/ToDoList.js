import React, { Component } from 'react';
import './ToDoList.css';

import Form from './Form';
import TaskCard from './TaskCard';

const DATA = window.localStorage.getItem('id');

class toDoList extends Component {
    inputRef = React.createRef()
    state = {
        data: [
            {id: "0.05701245524787524", title: "Task 1", done: false, priority: 1},
            {id: "0.5863039561632211", title: "Task 2", done: false, priority: 1},
            {id: "0.0739946906672837", title: "Task 3", done: false, priority: 1},
            {id: "0.7159275683731299", title: "Task 4", done: false, priority: 1}
        ],
        isPlusClicked: false
    }

    handleClick = (e) => {
        if (e.target.matches('.Plus')) {
            this.setState({ isPlusClicked: !this.state.isPlusClicked });
        } else if (e.target.matches('.Cancel')) {
            localStorage.clear();
            this.inputRef.current.value = '';
        } else if (e.target.matches('.AddTaskButton')) {
            const data = [...this.state.data, { id: Math.random().toString(), title: this.state.title, done: false, priority: 2 }]
            let newItem = data[data.length - 1]
            localStorage.setItem(JSON.stringify(newItem.id),JSON.stringify(newItem));
            this.setState({
                data,
                isPlusClicked: false
            })
        }
    }

    removeItem = (index) => {
        const data = [...this.state.data];
        data.splice(index, 1);
        localStorage.removeItem(JSON.stringify(data[index].id))
        this.setState({ data });
    }

    handleChange = () => {
        const title = this.inputRef.current.value;
        this.setState({ title });
    }

    renderTaskCard = () => {
        return this.state.data.map((item, index) => {
            return <TaskCard    key={item.id}
                                removeItem={() => this.removeItem(index)}
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
                                }}
                                {...this.state.data}
                                {...item} />;
                                
        });
        
    }

    render() {
        let content = null;
        if (this.state.isPlusClicked) {
            content = (<Form   clicked={this.handleClick}
                                changed={this.handleChange} 
                                inputRef={this.inputRef}/>)}

        return (
            <div>
                <div className="Banner">
                    <h1>To-do List</h1> 
                </div>
                <div className="AddTask">
                    {this.renderTaskCard()}
                    {content}
                    <div className="PlusHolder">
                            <div className="PlusWrapper" onClick={(e) => this.handleClick(e)}>
                                <i className="fas fa-plus Plus"></i>
                            </div>
                            <span className="ThreeDots"><strong>...</strong></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default toDoList;