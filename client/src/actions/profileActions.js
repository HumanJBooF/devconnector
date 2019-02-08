import API from '../utils/api.controller';
import types from './types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { logoutUser } from './authActions';

const { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILES } = types;

const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    API.getCurrentProfile()
        .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
        .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
}

const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    API.getAllProfiles()
        .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
        .catch(err => dispatch({ type: GET_PROFILES, payload: {} }))
}

const createProfile = (profileData, history) => dispatch => {
    API.createProfile(profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const setProfileLoading = () => {
    return { type: PROFILE_LOADING }
}

const clearProfile = () => {
    return { type: CLEAR_CURRENT_PROFILE }
}


const addExp = (expData, history) => dispatch => {
    API.addExp(expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const addEdu = (eduData, history) => dispatch => {
    API.addEdu(eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

const deleteAccount = () => dispatch => {
    // Sweet Alert to confirm
    const deleteAlert = withReactContent(Swal);
    deleteAlert.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, I will stay longer.'
    }).then(result => {
        if (result.value) {
            deleteAlert.fire(
                'Deleted!',
                'Your profile has been deleted.',
                'success'
            )
            API.deleteProfile()
                .then(res => dispatch(logoutUser()))
                .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
        }
    })
}

const deleteExp = id => dispatch => {
    // Sweet Alert to confirm
    const deleteAlert = withReactContent(Swal);
    deleteAlert.fire({
        title: 'Are you sure?',
        text: "You can always add the experience again.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, my mistake.'
    }).then(result => {
        if (result.value) {
            deleteAlert.fire(
                'Deleted!',
                'This experience has been deleted.',
                'success'
            )
            API.deleteExp(id)
                .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
                .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
        }
    })
}
const deleteEdu = id => dispatch => {
    // Sweet Alert to confirm
    const deleteAlert = withReactContent(Swal);
    deleteAlert.fire({
        title: 'Are you sure?',
        text: "You can always add your education again.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, my mistake.'
    }).then(result => {
        if (result.value) {
            deleteAlert.fire(
                'Deleted!',
                'This experience has been deleted.',
                'success'
            )
            API.deleteEdu(id)
                .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
                .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
        }
    })
}

export {
    getCurrentProfile,
    clearProfile,
    createProfile,
    deleteAccount,
    addExp,
    addEdu,
    deleteExp,
    deleteEdu,
    getProfiles
} 