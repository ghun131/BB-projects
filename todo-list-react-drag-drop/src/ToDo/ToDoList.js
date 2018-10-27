import React, { Component } from 'react';
import './ToDoList.css';

import Form from './Form';
import TaskCard from './TaskCard';
import Done from './Done/Done';

class toDoList extends Component {
    inputRef = React.createRef()
    state = {
        data: [
            {id: "a", title: "Task 1", done: false, priority: 1},
            {id: "b", title: "Task 2", done: false, priority: 1},
            {id: "c", title: "Task 3", done: false, priority: 1},
            {id: "d", title: "Task 4", done: false, priority: 1}
        ],
        done: [],
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
                                }}
                                {...this.state.data}
                                {...item} />;
                                
        });
    }

    handleDragStart = (e, id) => {
        e.dataTransfer.setData('text', id);
        console.log('drag')
    }

    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('over')
    }

    handleDropWorking = (e) => {
        e.preventDefault();
        let newItem = e.dataTransfer.getData('text');
        let dragItem = this.state.data.filter(el => el.id === newItem);
        const data = [...this.state.data];
        const done = [...this.state.done]
        done.push(dragItem[0]);
        let index = data.indexOf(dragItem[0]);
        data.splice(index, 1);
        this.setState({ data, done })
    }

    render() {
        let content = null;
        if (this.state.isPlusClicked) {
            content = (<Form   clicked={this.handleClick}
                                changed={this.handleChange} 
                                inputRef={this.inputRef}/>)}

        return (
            <div className="ToDoList">
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
                <Done 
                    drop={(e) => this.handleDropWorking(e)}
                    dragOver={e => this.handleDragOver(e)}/>
            </div>
        )
    }
}

export default toDoList;