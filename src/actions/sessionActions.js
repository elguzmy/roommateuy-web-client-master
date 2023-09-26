import {
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
    USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
    GET_CURRENT_USER, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_ERROR
} from './actionTypes';
import sessionAPI from '../api/sessionAPI';
import sessionHelper from '../lib/httpClient/sessionHelper';
import history from '../utils/history';
import profileAPI from "../api/profileAPI";

const _login = data => (
    {
        type: LOGIN,
        payload: data,
    }
);

const loginSuccess = data => (
    {
        type: LOGIN_SUCCESS,
        payload: data,
    }
);

const loginError = data => (
    {
        type: LOGIN_ERROR,
        payload: data,
    }
);

const _userRegister = data => (
    {
        type: USER_REGISTER,
        payload: data,
    }
);

const userRegisterSuccess = data => (
    {
        type: USER_REGISTER_SUCCESS,
        payload: data,
    }
);

const userRegisterError = data => (
    {
        type: USER_REGISTER_ERROR,
        payload: data
    }
);

const _getCurrentUser = data => (
    {
        type: GET_CURRENT_USER,
        payload: data,
    }
);

const getCurrentUserSuccess = data => (
    {
        type: GET_CURRENT_USER_SUCCESS,
        payload: data,
    }
);

const getCurrentUserError = data => (
    {
        type: GET_CURRENT_USER_ERROR,
        payload: data,
    }
);

export function loginLocal(data) {
    return dispatch => {
        dispatch(_login(data));

        return sessionAPI.userLocalLogin(data)
            .then(res => {
                sessionHelper.setAuthToken('UserToken', res.data.token);
                sessionHelper.setAuthToken('RefreshToken', res.data.refresh_token);
                sessionHelper.setAuthToken('UserId', res.data.user_id);

                history.push('/');

                dispatch(loginSuccess(res));
            })
            .catch(err =>
                dispatch(loginError({
                    error: err.response,
                }))
            )
    }
}

export function getCurrentUser(data) {
    return dispatch => {
        dispatch(_getCurrentUser(data));

        return sessionAPI.getCurrentUser(data)
            .then(res => {
                dispatch(getCurrentUserSuccess(res))
            })
            .catch(err => {
                dispatch(getCurrentUserError({
                    error: err.response
                }))
            })
    }
}

export function userRegister(data) {
    return dispatch => {
        dispatch(_userRegister(data));

        sessionAPI.userRegisterAuth({
            email: data.email,
            password: data.password
        })
            .then(res => {
                sessionHelper.setAuthToken('UserToken', res.data.token);
                sessionHelper.setAuthToken('RefreshToken', res.data.refreshToken);
                sessionHelper.setAuthToken('UserId', res.data.user_id);

                data = Object.assign({ user_id: res.data.user_id }, data); // add user_id
                delete data.email; //Remove. Delete email because property does not exists on user db model

                return profileAPI.registerProfile(data)
                    .then(res => {
                        dispatch(userRegisterSuccess(res.data));
                        sessionHelper.setAuthToken('User', JSON.stringify(data));
                        history.push('/profile');
                    })
                    .catch(err => dispatch(userRegisterError({
                        error: err.response.data,
                    })));
            })
            .catch(err => dispatch(userRegisterError({
                error: err.response,
            })));
    }
}

export function loginFacebook(data) {
    return dispatch => {
        dispatch(_login(data));

        return sessionAPI.userFacebookLogin(data)
            .then(res => {
                console.log(res,data)
                sessionHelper.setAuthToken('UserToken', res.data.token);
                sessionHelper.setAuthToken('RefreshToken', res.data.refresh_token);
                sessionHelper.setAuthToken('UserId', res.data.user_id);

                data["user_id"] = res.data.user_id;
                delete data.access_token;

                return profileAPI.registerProfile(data)
                    .then(res => {
                        dispatch(userRegisterSuccess(res.data));
                        sessionHelper.setAuthToken('User', JSON.stringify(data));
                        dispatch(loginSuccess(res));
                        history.push("/");
                    })
                    .catch(err => dispatch(userRegisterError({
                        error: err.response.data,
                    })));
            })
            .catch(err =>
                dispatch(loginError({
                    error: err.response,
                }))
            )
    }
}