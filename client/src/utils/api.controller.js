import axios from 'axios';

const apiController = {
    registerUser: newUser => axios.post('/api/users/register', newUser),
    loginUser: user => axios.post('/api/users/login', user),
    getCurrentProfile: () => axios.get('/api/profile'),
    getAllProfiles: () => axios.get('/api/profile/all'),
    setAuthToken: token => {
        token
            ? axios.defaults.headers.common['Authorization'] = token
            : delete axios.defaults.headers.common['Authorization'];
    },
    createProfile: profileData => axios.post('/api/profile', profileData),
    deleteProfile: () => axios.delete('/api/profile'),
    deleteExp: id => axios.delete(`/api/profile/experience/${id}`),
    deleteEdu: id => axios.delete(`/api/profile/education${id}`),
    addExp: expData => axios.post('/api/profile/experience', expData),
    addEdu: eduData => axios.post('/api/profile/education', eduData)
}

export default apiController;