import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errReducer from './errorReducer';
import profileState from './profileReducer';

export default combineReducers({
    auth: authReducer,
    errors: errReducer,
    profile: profileState
});