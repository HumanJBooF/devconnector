import React from 'react';
import { Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import API from '../utils/api.controller';
import { setCurrentUser, logoutUser } from '../actions/authActions';
import store from '../store';
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Footer from './layout/Footer';
import Login from './auth/Login';
import Register from './auth/Register';

if (localStorage.jwtToken) {
    // Keep user logged in
    API.setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser);
        window.location.href = '/login';
    }
}

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