import axios from 'axios';

const apiController = {
    getCurrentProfile: () => axios.get('/api/profile'),
    getAllProfiles: () => axios.get('/api/profile/all'),
    getProfileByHandle: handle => axios.get(`/api/profile/handle/${handle}`),
    getGithubRepos: username => axios.get(`/api/profile/github/${username}`),
    registerUser: newUser => axios.post('/api/users/register', newUser),
    loginUser: user => axios.post('/api/users/login', user),
    createProfile: profileData => axios.post('/api/profile', profileData),
    addExp: expData => axios.post('/api/profile/experience', expData),
    addEdu: eduData => axios.post('/api/profile/education', eduData),
    addPost: postData => axios.post('/api/posts', postData),
    deleteProfile: () => axios.delete('/api/profile'),
    deleteExp: id => axios.delete(`/api/profile/experience/${id}`),
    deleteEdu: id => axios.delete(`/api/profile/education${id}`),
    setAuthToken: token => {
        token
            ? axios.defaults.headers.common['Authorization'] = token
            : delete axios.defaults.headers.common['Authorization'];
    }
}

export default apiController;