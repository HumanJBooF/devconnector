import types from '../actions/types';

const { GET_ERRORS, CLEAR_ERRORS } = types;

const initialState = {};

const errState = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}

export default errState;