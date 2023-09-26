import {
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
    GET_CURRENT_USER, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_ERROR,
    USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
} from '../actions/actionTypes';

export const initialState = {
    status: '',
    sessionId: '',
    expires: 0,
    error: null,
    pending: false,
};


export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.payload,
                pending: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                pending: false,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                ...action.payload,
                pending: false,
            };


        case USER_REGISTER:
            return {
                ...state,
                pending: true,
            };
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                error: null,
                pending: false,
            };
        case USER_REGISTER_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };


        case GET_CURRENT_USER:
            return {
                ...state,
                ...action.payload,
                pending: true,
            };
        case GET_CURRENT_USER_SUCCESS:
            return Object.assign({}, state, {
                user: action.payload,
                error: null,
                pending: false,
            });
        case GET_CURRENT_USER_ERROR:
            return Object.assign({}, state, {
                user: null,
                error: action.payload,
                pending: false,
            });
        default:
            return state;
    }
}
