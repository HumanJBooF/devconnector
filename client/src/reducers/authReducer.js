const initialState = {
    isAuthenticated: false,
    user: {}
}

const initState = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default initState;