import types from '../actions/types';

const { ADD_POST, POST_LOADING, GET_POSTS, GET_POST, DELETE_POST, LIKE_POST } = types;

const initialState = {
    posts: [],
    post: {},
    loading: false
}

const postState = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return { ...state, posts: [action.payload, ...state.posts] };
        case POST_LOADING:
            return { ...state, loading: true };
        case GET_POSTS:
            return { ...state, posts: action.payload, loading: false }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post =>
                    (post._id === action.payload._id)
                        ? action.payload
                        : post
                )
            }
        case GET_POST:
            return { ...state, post: action.payload, loading: false }
        default:
            return state;
    }
}

export default postState; 