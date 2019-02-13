import API from '../utils/api.controller';
import types from './types';

const { ADD_POST, GET_ERRORS } = types;

const addPost = postData => dispatch => {
    API.addPost(postData)
        .then(res => dispatch({ type: ADD_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export {
    addPost
}