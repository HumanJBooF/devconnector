import API from '../utils/api.controller';
import types from './types';

const { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } = types;

const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    API.getCurrentProfile()
        .then(res => dispatch({ type: GET_PROFILE, payload: res.data }, console.log(res.data)))
        .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
}

const setProfileLoading = () => {
    return { type: PROFILE_LOADING }
}

const clearProfile = () => {
    return { type: CLEAR_CURRENT_PROFILE }
}

export {
    getCurrentProfile,
    clearProfile
} 