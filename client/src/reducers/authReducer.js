import types from '../actions/types';
import isEmpty from '../validation/is-empty';

const { SET_CURRENT_USER } = types;

const initialState = {
    isAuthenticated: false,
    user: {}
}

const authState = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}

export default authState;