import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import UNSTATED from 'unstated-debug';
import Routes from './Routes';

UNSTATED.isEnable = true;
UNSTATED.logStateChanges = false;

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Routes />
                <Footer />
            </div>
        )
    }
}

export default App;