import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import ToDoList from './ToDo/ToDoList';

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>To-do List</h1> 
                <ToDoList />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));