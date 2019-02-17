import types from '../actions/types';

const { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } = types;
const initialState = {
    profile: {},
    profiles: {},
    loading: false
};

const profileState = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return { ...state, loading: true };
        case GET_PROFILE:
            return { ...state, profile: action.payload, loading: false };
        case CLEAR_CURRENT_PROFILE:
            return { ...state, profile: {} }
        case GET_PROFILES:
            return { ...state, profiles: action.payload, loading: false }
        default:
            return state;
    }
}

export default profileState;


