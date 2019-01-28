import axios from 'axios';

const apiController = {
    registerUser: newUser => axios.post('/api/users/register', newUser),
    loginUser: user => axios.post('/api/users/login', user),
    setAuthToken: token => {
        token
            ? axios.defaults.headers.common['Authorization'] = token
            : delete axios.defaults.headers.common['Authorization'];
    }
}

export default apiController;