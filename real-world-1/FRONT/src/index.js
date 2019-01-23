import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

export default class Index extends React.Component {
    render() {
        return (
            <div>
                Something
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Index />
    </BrowserRouter>
, document.getElementById('root'));