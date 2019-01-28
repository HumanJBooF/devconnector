// Register User
import API from '../utils/api.controller';
import types from './types';
import jwt_decode from 'jwt-decode';

const registerUser = (userData, history) => dispatch => {
    API.registerUser(userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({ type: types.GET_ERRORS, payload: err.response.data }));
}

const loginUser = userData => dispatch => {
    API.loginUser(userData)
        .then(res => {
            const { token } = res.data;
            // Save to localStorage
            localStorage.setItem('jwtToken', token);
            API.setAuthToken(token);
            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({ type: types.GET_ERRORS, payload: err.response.data }));
}

const setCurrentUser = decoded => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded
    };
}

const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    API.setAuthToken(false);
    dispatch(setCurrentUser({}));
}

export {
    registerUser,
    loginUser,
    setCurrentUser,
    logoutUser
}