import React, { Component } from 'react';
import './ToDoList.css';

import Form from './Form';
import TaskCard from './TaskCard';

class toDoList extends Component {
    inputRef = React.createRef()

    state = {
        data: [
            { id: 'm', title: "Task 1", done: false, priority: 1 },
            { id: 'w', title: "Task 2", done: false, priority: 1 },
            { id: 'q', title: "Task 3", done: false, priority: 1 },
            { id: 'p', title: "Task 4", done: false, priority: 1 }
        ],
        isPlusClicked: false,
    }

    handleClick = (e) => {
        if (e.target.matches('.Plus')) {
            this.setState({ isPlusClicked: !this.state.isPlusClicked });
        } else if (e.target.matches('.Cancel')) {
            this.inputRef.current.value = '';
        } else if (e.target.matches('.AddTaskButton')) {
            this.setState({
                data: [...this.state.data, {title: this.state.title, done: false, priority: 2 }],
                isPlusClicked: false
            })
            // this.renderTaskCard();
            // console.log(this.state.cards);
        }
    }

    removeItem = (index) => {
        const data = [...this.state.data];
        data.splice(index, 1);
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