// Register User
import API from '../utils/api.controller';
import types from './types';
import jwt_decode from 'jwt-decode';

const { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } = types;

const registerUser = (userData, history) => async dispatch => {
    try {
        dispatch(clearErrors());
        const res = await API.registerUser(userData);
        if (res) {
            history.push('/login');
        }
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data })
    }
}

const loginUser = userData => async dispatch => {
    try {
        dispatch(clearErrors());
        const res = await API.loginUser(userData);
        if (res) {
            const { token } = res.data;
            // Save to localStorage            
            localStorage.setItem('jwtToken', token);
            await API.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        }
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data })
    }
}

const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

const logoutUser = () => async dispatch => {
    localStorage.removeItem('jwtToken');
    await API.setAuthToken(false);
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