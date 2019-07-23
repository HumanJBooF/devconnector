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
    CLEAR_ERRORS
} = types;

const addPost = postData => async dispatch => {
    try {
        dispatch(clearErrors());
        const res = await API.addPost(postData);
        dispatch({ type: ADD_POST, payload: res.data })
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data })
    }
}

const getPosts = () => async dispatch => {
    try {
        dispatch(setPostLoading);
        const res = await API.getPosts();
        dispatch({ type: GET_POSTS, payload: res.data })
    } catch (err) {
        dispatch({ type: GET_POSTS, payload: null })
    }
}

const getPost = id => async dispatch => {
    try {
        const res = await API.getPost(id);
        dispatch({ type: GET_POST, payload: res.data })
    } catch (err) {
        dispatch({ type: GET_POST, payload: null })

    }
}

const deletePost = id => async dispatch => {
    try {
        await API.deletePost(id);
        dispatch({ type: DELETE_POST, payload: id });
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await API.deleteComment(postId, commentId)
        dispatch({ type: DELETE_COMMENT, payload: commentId });
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

const addLike = id => async dispatch => {
    try {
        const res = await API.addLike(id);
        dispatch({ type: LIKE_POST, payload: res.data })
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data })
    }
}

const addComment = (postId, commentData) => async dispatch => {
    try {
        dispatch(clearErrors());
        const res = API.addComment(postId, commentData);
        dispatch({ type: GET_POST, payload: res.data })
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data })
    }
}

const removeLike = id => async dispatch => {
    try {
        const res = await API.removeLike(id);
        dispatch({ type: LIKE_POST, payload: res.data })
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data })
    }
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