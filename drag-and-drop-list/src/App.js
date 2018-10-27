import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";

import Heading from './Heading';

const DATA = {
    working: [
        {id: "9182", title: "buy stuff"},
        {id: "sdf28", title: "do stuff"},
        {id: "oi12us", title: "dinner"}
    ],
    done: [
        {id: "fu2ku", title: "put in data"}
    ]
}

export default class App extends React.Component {
    state={
        data: DATA,
    }

    handleDragStart = (e, id) => {
        const list = e.target.closest('.DropBox').dataset.list
        e.dataTransfer.setData('text', id);
        e.dataTransfer.setData('list', list);
    }

    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop = (e) => {
        e.preventDefault();
        let newItem = e.dataTransfer.getData('text');
        const data = {...this.state.data};
        const from = e.dataTransfer.getData('list') // Make it more abstract, no more repeating myself
        const to = e.currentTarget.dataset.list
        let dragItem = this.state.data[from].filter(el => el.id === newItem);
        data[to].push(dragItem[0]);
        let index = data[from].indexOf(dragItem[0]);
        data[from].splice(index, 1);
        this.setState({ data })
    }

    // handleDropDone = (e) => {
    //     e.preventDefault();
    //     let newItem = e.dataTransfer.getData('text');
    //     let dragDone = this.state.data.done.filter(el => el.id === newItem);       
    //     const data = {...this.state.data};
    //     data.working.push(dragDone[0]);
    //     let index = data.done.indexOf(dragDone[0]);
    //     data.done.splice(index, 1);
    //     this.setState({ data })
    // }

    render() {
        return(
            <div className="App">
                <Heading 
                    list="working"
                    title="Working List"
                    data={this.state.data.working}
                    dragStart={(e, id) => this.handleDragStart(e, id)}
                    drop={(e) => this.handleDrop(e)}
                    dragOver={e => this.handleDragOver(e)}
                    />
                <Heading 
                    list="done"
                    title="Done List"
                    data={this.state.data.done}
                    dragStart={(e, id) => this.handleDragStart(e, id)}
                    drop={(e) => this.handleDrop(e)}
                    dragOver={e => this.handleDragOver(e)}
                    />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));