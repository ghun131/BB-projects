import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'unstated';
import App from './containers/App';

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider>
        <Index />
    </Provider>
, document.getElementById('root'));