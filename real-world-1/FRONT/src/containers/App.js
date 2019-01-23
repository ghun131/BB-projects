import React from 'react';
import Header from '../components/Header';
import Home from '../components/Home';
import Footer from '../components/Footer';

import Routes from './Routes';

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