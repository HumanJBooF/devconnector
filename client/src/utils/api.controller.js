import axios from 'axios';

const apiController = {
    registerUser: newUser => axios.post('/api/users/register', newUser),
    loginUser: user => axios.post('/api/users/login', user),
}

export default apiController;