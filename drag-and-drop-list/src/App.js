import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";

import Working from './Working';
import Done from './Done';

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
        e.dataTransfer.setData('text', id);
    }

    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDropWorking = (e) => {
        e.preventDefault();
        let newItem = e.dataTransfer.getData('text');
        let dragWorking = this.state.data.working.filter(el => el.id === newItem);
        const data = {...this.state.data};
        data.done.push(dragWorking[0]);
        let index = data.working.indexOf(dragWorking[0]);
        data.working.splice(index, 1);
        this.setState({ data })
    }

    handleDropDone = (e) => {
        e.preventDefault();
        let newItem = e.dataTransfer.getData('text');
        let dragDone = this.state.data.done.filter(el => el.id === newItem);       
        const data = {...this.state.data};
        data.working.push(dragDone[0]);
        let index = data.done.indexOf(dragDone[0]);
        data.done.splice(index, 1);
        this.setState({ data })
    }

    render() {
        return(
            <div className="App">
                <Working 
                    class={this.state.className}
                    data={this.state.data}
                    dragStart={(e, id) => this.handleDragStart(e, id)}
                    drop={(e) => this.handleDropDone(e)}
                    dragOver={e => this.handleDragOver(e)}/>
                <Done 
                    class={this.state.className}
                    data={this.state.data}
                    dragStart={(e, id) => this.handleDragStart(e, id)}
                    drop={(e) => this.handleDropWorking(e)}
                    dragOver={e => this.handleDragOver(e)}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));