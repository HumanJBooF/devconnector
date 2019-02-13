import types from '../actions/types';

const { GET_ERRORS } = types;

const initialState = {};

const errState = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}

export default errState;