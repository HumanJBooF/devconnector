import API from '../utils/api.controller';
import types from './types';
const {
    ADD_POST,
    GET_ERRORS,
    POST_LOADING,
    GET_POSTS,
    GET_POST,
    DELETE_POST,
    LIKE_POST,
    DELETE_COMMENT,
    CLEAR_ERRORS } = types;

const addPost = postData => dispatch => {
    dispatch(clearErrors());
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

const deleteComment = (postId, commentId) => dispatch => {
    API.deleteComment(postId, commentId)
        .then(res => dispatch({ type: DELETE_COMMENT, payload: commentId }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const addLike = id => dispatch => {
    API.addLike(id)
        .then(res => dispatch({ type: LIKE_POST, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    API.addComment(postId, commentData)
        .then(res => dispatch({ type: GET_POST, payload: res.data }))
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

const clearErrors = () => {
    return { type: CLEAR_ERRORS }
}

export {
    addPost,
    addLike,
    addComment,
    getPost,
    getPosts,
    deletePost,
    deleteComment,
    removeLike
}