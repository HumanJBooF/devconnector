import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { setCurrentUser, logoutUser } from '../actions/authActions';
import { clearProfile } from '../actions/profileActions';
import { Navbar, Landing, Footer } from './layout/';
import { Login, Register } from './auth/';
import { AddExp, AddEdu } from './add-credentials/';
import Dashboard from './dashboard/';
import CreateProfile from './create-profile/';
import EditProfile from './edit-profile/';
import Posts from './posts/';
import Profiles from './profiles/';
import Profile from './profile/';
import NotFound from './not-found/';
import PrivateRoute from './common/PrivateRoute';
import API from '../utils/api.controller';
import store from '../store';
import jwt_decode from 'jwt-decode';

if (localStorage.jwtToken) {
    // Keep user logged in
    API.setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearProfile());
        window.location.href = '/login';
    }
}

class Main extends React.Component {
    render () {
        return (
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/profiles' component={Profiles} />
                    <Route exact path='/profile/:handle' component={Profile} />
                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                    <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                    <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                    <PrivateRoute exact path='/add-experience' component={AddExp} />
                    <PrivateRoute exact path='/add-education' component={AddEdu} />
                    <PrivateRoute exact path='/feed' component={Posts} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;