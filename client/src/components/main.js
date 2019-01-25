import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Footer from './layout/Footer';
import Login from './auth/Login';
import Register from './auth/Register';

class Main extends React.Component {
    render () {
        return (
            <div className="App">
                <Navbar />
                <Route exact path='/' component={Landing} />
                <div className="container">
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/Login' component={Login} />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;