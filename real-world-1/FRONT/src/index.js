import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <App />
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Index />
    </BrowserRouter>
, document.getElementById('root'));