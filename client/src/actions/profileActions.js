import API from '../utils/api.controller';
import { logoutUser } from './authActions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import types from './types';

const {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    GET_PROFILES,
    CLEAR_ERRORS } = types;

const getCurrentProfile = () => async dispatch => {
    try {
        dispatch(setProfileLoading());
        const { data } = await API.getCurrentProfile();
        dispatch({ type: GET_PROFILE, payload: data })
    } catch (err) {
        dispatch({ type: GET_PROFILE, payload: {} })
    }
}

const getProfiles = () => async dispatch => {
    try {
        dispatch(setProfileLoading());
        const { data } = await API.getAllProfiles();
        dispatch({ type: GET_PROFILES, payload: data })
    } catch (err) {
        dispatch({ type: GET_PROFILES, payload: {} })
    }
}

const getProfileByHandle = handle => async dispatch => {
    try {
        dispatch(setProfileLoading());
        const { data } = await API.getProfileByHandle(handle);
        dispatch({ type: GET_PROFILE, payload: data });
    } catch (err) {
        dispatch({ type: GET_PROFILE, payload: {} });
    }
}

const createProfile = (profileData, history) => async dispatch => {
    try {
        dispatch(clearErrors());
        const res = await API.createProfile(profileData);
        if (res) {
            history.push('/dashboard')
        }
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data })
    }
}

const setProfileLoading = () => {
    return { type: PROFILE_LOADING }
}

const clearProfile = () => {
    return { type: CLEAR_CURRENT_PROFILE }
}

const clearErrors = () => {
    return { type: CLEAR_ERRORS }
}

const addExp = (expData, history) => async dispatch => {
    try {
        dispatch(clearErrors());
        const res = await API.addExp(expData);
        if (res) {
            history.push('/dashboard');
        }
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

const addEdu = (eduData, history) => async dispatch => {
    try {
        dispatch(clearErrors());
        const res = await API.addEdu(eduData);
        if (res) {
            history.push('/dashboard');
        }
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

const deleteAccount = () => async dispatch => {
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
            try {
                const res = await API.deleteProfile();
                if (res) {
                    dispatch(logoutUser())
                }
            } catch (err) {
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            }
        }
    })
}

const deleteExp = id => async dispatch => {
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
            try {
                const { data } = await API.deleteExp(id);
                dispatch({ type: GET_PROFILE, payload: data });
            } catch (err) {
                dispatch({ type: GET_ERRORS, payload: err.response.data });
            }
        }
    })
}
const deleteEdu = id => async dispatch => {
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
            );
            try {
                const { data } = await API.deleteEdu(id);
                dispatch({ type: GET_PROFILE, payload: data })
            } catch (err) {
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            }
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
    getProfiles,
    getProfileByHandle
} 