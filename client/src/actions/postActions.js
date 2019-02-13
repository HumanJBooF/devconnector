import API from '../utils/api.controller';
import types from './types';

const { ADD_POST, GET_ERRORS, POST_LOADING, GET_POSTS, GET_POST, DELETE_POST, LIKE_POST } = types;

const addPost = postData => dispatch => {
    API.addPost(postData)
        .then(res => dispatch({ type: ADD_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const getPosts = () => dispatch => {
    dispatch(setPostLoading);
    API.getPosts()
        .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
        .catch(err => dispatch({ type: GET_POSTS, payload: null }))
}

const getPost = id => dispatch => {
    API.getPost(id)
        .then(res => dispatch({ type: GET_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_POST, payload: null }))
}

const deletePost = id => dispatch => {
    API.deletePost(id)
        .then(res => dispatch({ type: DELETE_POST, payload: id }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const addLike = id => dispatch => {
    API.addLike(id)
        .then(res => dispatch({ type: LIKE_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const removeLike = id => dispatch => {
    API.removeLike(id)
        .then(res => dispatch({ type: LIKE_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const setPostLoading = () => {
    return { type: POST_LOADING }
}

export {
    addPost,
    getPosts,
    getPost,
    deletePost,
    addLike,
    removeLike
}