import types from '../actions/types';

const initialState = {};

const errState = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}

export default errState;