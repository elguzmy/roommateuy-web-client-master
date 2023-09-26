import {
    GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR,
    UPLOAD_PROFILE_IMAGE, UPLOAD_PROFILE_IMAGE_SUCCESS, UPLOAD_PROFILE_IMAGE_ERROR,
    UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR,
    GET_PROFILE_SUGGESTION, GET_PROFILE_SUGGESTION_SUCCESS, GET_PROFILE_SUGGESTION_ERROR,
} from './actionTypes';
import profileAPI from '../api/profileAPI';

//GET PROFILE
const _getProfile = data => (
    {
        type: GET_PROFILE,
        payload: data,
    }
);

const getProfileSuccess = data => (
    {
        type: GET_PROFILE_SUCCESS,
        payload: data
    }
);

const getProfileError = data => (
    {
        type: GET_PROFILE_ERROR,
        payload: data,
    }
);

//UPDATE PROFILE
const _updateProfile = data => (
    {
        type: UPDATE_PROFILE,
        payload: data,
    }
);

const updateProfileSuccess = data => (
    {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
    }
);

const updateProfileError = data => (
    {
        type: UPDATE_PROFILE_ERROR,
        payload: data,
    }
);

const _uploadProfileImage = data => (
    {
        type: UPLOAD_PROFILE_IMAGE,
        payload: data,
    }
);

const uploadProfileImageSuccess = data => (
    {
        type: UPLOAD_PROFILE_IMAGE_SUCCESS,
        payload: data,
    }
);

const uploadProfileImageError = data => (
    {
        type: UPLOAD_PROFILE_IMAGE_ERROR,
        payload: data,
    }
);

//SUGGESTION
const _getProfileSuggestion = data => (
    {
        type: GET_PROFILE_SUGGESTION,
        payload: data,
    }
);

const getProfileSuggestionSuccess = data => (
    {
        type: GET_PROFILE_SUGGESTION_SUCCESS,
        payload: data
    }
);

const getProfileSuggestionError = data => (
    {
        type: GET_PROFILE_SUGGESTION_ERROR,
        payload: data,
    }
);


export function uploadProfileImage(data) {
    return dispatch => {
        dispatch(_uploadProfileImage(data));

        return profileAPI.uploadProfileImage(data)
            .then(
                res => {
                    dispatch(uploadProfileImageSuccess(res.data));
                },
                err => {
                    dispatch(uploadProfileImageError({
                        error: err.response,
                    }))
                }
            )
    }
}

export function getProfile(data) {
    return dispatch => {
        dispatch(_getProfile(data));

        return profileAPI.getProfile(data)
            .then(res => {
                dispatch(getProfileSuccess(res.data))
            })
            .catch(err => {
                dispatch(getProfileError({
                    error: err.response
                }))
            })
    }
}


export function updateUserProfile(data) {
    return dispatch => {
        dispatch(_updateProfile(data));

        return profileAPI.updateProfile(data)
            .then(res => {
                dispatch(updateProfileSuccess(res.data))
            })
            .catch(err => {
                dispatch(updateProfileError({
                    error: err.response
                }))
            })
    }
}

export function getProfileSuggestion(data) {
    return dispatch => {
        dispatch(_getProfileSuggestion(data));

        return profileAPI.getProfileSuggestion(data)
            .then(res => {
                const refreshInterval = setInterval(
                    () => {
                        profileAPI.checkProfileSuggestionReady(data)
                            .then(resSuggestion => {
                                if (resSuggestion.data.status === "COMPLETED") {
                                    clearInterval(refreshInterval);
                                }

                                dispatch(getProfileSuggestionSuccess(resSuggestion.data.result))
                            })
                            .catch(err => {
                                dispatch(getProfileSuggestionError({
                                    error: err.response
                                }))
                            });
                    }, 5000
                );
            })
            .catch(err => {
                dispatch(getProfileSuggestionError({
                    error: err.response
                }))
            });
    }
}