// Register User
import API from '../utils/api.controller';
import types from './types';
import jwt_decode from 'jwt-decode';

const { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } = types;

const registerUser = (userData, history) => dispatch => {
    dispatch(clearErrors())
    API.registerUser(userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

const loginUser = userData => dispatch => {
    dispatch(clearErrors())
    API.loginUser(userData)
        .then(res => {
            const { token } = res.data;
            // Save to localStorage
            localStorage.setItem('jwtToken', token);
            API.setAuthToken(token);
            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    API.setAuthToken(false);
    dispatch(setCurrentUser({}));
}

const clearErrors = () => {
    return { type: CLEAR_ERRORS }
}

export {
    registerUser,
    loginUser,
    setCurrentUser,
    logoutUser
}