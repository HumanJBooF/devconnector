import axios from 'axios';

const apiController = {
    registerUser: newUser => axios.post('/api/users/register', newUser),
    loginUser: user => axios.post('/api/users/login', user),
    getCurrentProfile: () => axios.get('/api/profile'),
    setAuthToken: token => {
        token
            ? axios.defaults.headers.common['Authorization'] = token
            : delete axios.defaults.headers.common['Authorization'];
    },
    createProfile: profileData => axios.post('/api/profile', profileData),
    deleteProfile: () => axios.delete('/api/profile'),
    addExp: expData => axios.post('/api/profile/experience', expData)
}

export default apiController;