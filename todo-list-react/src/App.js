import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import ToDoList from './ToDoList.js';

class App extends Component {
    render() {
        return(
            <div className="App">
                <ToDoList />
                <ToDoList />
                <ToDoList />
            </div>            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));