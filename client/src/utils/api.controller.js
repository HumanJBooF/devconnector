import axios from 'axios';

const apiController = {
    // Axios .get
    getCurrentProfile: () => axios.get('/api/profile'),
    getAllProfiles: () => axios.get('/api/profile/all'),
    getProfileByHandle: handle => axios.get(`/api/profile/handle/${handle}`),
    getGithubRepos: username => axios.get(`/api/profile/github/${username}`),
    getPosts: () => axios.get('/api/posts'),
    getPost: id => axios.get(`/api/posts/${id}`),
    // Axios .post
    registerUser: newUser => axios.post('/api/users/register', newUser),
    loginUser: user => axios.post('/api/users/login', user),
    createProfile: profileData => axios.post('/api/profile', profileData),
    addExp: expData => axios.post('/api/profile/experience', expData),
    addEdu: eduData => axios.post('/api/profile/education', eduData),
    addPost: postData => axios.post('/api/posts', postData),
    addLike: id => axios.post(`/api/posts/like/${id}`),
    addComment: (postId, commentData) => axios.post(`/api/posts/comment/${postId}`, commentData),
    removeLike: id => axios.post(`/api/posts/unlike/${id}`),
    // Axios .delete
    deleteProfile: () => axios.delete('/api/profile'),
    deleteExp: id => axios.delete(`/api/profile/experience/${id}`),
    deleteEdu: id => axios.delete(`/api/profile/education${id}`),
    deletePost: id => axios.delete(`api/posts/${id}`),
    deleteComment: (postId, commentId) => axios.delete(`/api/posts/comment/${postId}/${commentId}`),
    // headers auth
    setAuthToken: token => {
        token
            ? axios.defaults.headers.common['Authorization'] = token
            : delete axios.defaults.headers.common['Authorization'];
    }
}

export default apiController;