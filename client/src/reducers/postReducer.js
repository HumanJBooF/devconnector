import types from '../actions/types';

const { ADD_POST } = types;

const initialState = {
    posts: [],
    post: {},
    loading: false
}

const postState = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return { ...state, posts: [action.payload, ...state.posts] };
        default:
            return state;
    }
}

export default postState; 