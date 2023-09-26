import {
    GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR,
    UPLOAD_PROFILE_IMAGE, UPLOAD_PROFILE_IMAGE_SUCCESS, UPLOAD_PROFILE_IMAGE_ERROR,
    UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR,
    GET_PROFILE_SUGGESTION, GET_PROFILE_SUGGESTION_SUCCESS, GET_PROFILE_SUGGESTION_ERROR
} from '../actions/actionTypes';

export const initialState = {
    first_name: '',
    last_name: '',
    gender: '',
    phone: '',
    address: {
        address1: '',
        country: '',
        city: '',
        state: '',
        zip_code: ''
    },
    profile_image: '',
    pending: false,
    uploading: false,
    profileSuggestion: []
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                pending: true,
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                pending: false,
            };
        case GET_PROFILE_ERROR:
            return {
                ...state,
                ...action.payload,
                pending: false,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                ...action.payload,
                pending: true,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                pending: false,
            };
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };
        case UPLOAD_PROFILE_IMAGE:
            return {
                ...state,
                uploading: true,
            };
        case UPLOAD_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                uploading: false,
            };
        case UPLOAD_PROFILE_IMAGE_ERROR:
            return {
                ...state,
                error: action.payload,
                uploading: false,
            };


        case GET_PROFILE_SUGGESTION:
            return {
                ...state,
                pending: true,
            };
        case GET_PROFILE_SUGGESTION_SUCCESS:
            return {
                ...state,
                profileSuggestion: action.payload,
                pending: false,
            };
        case GET_PROFILE_SUGGESTION_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };

        default:
            return state;
    }
}