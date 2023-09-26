import httpClient from '../lib/httpClient/httpClient'

//Local
// const API_URL_ROOT = 'http://localhost:8001/api/v1/auth';

// //Heroku
const API_URL_ROOT = 'https://roommateuy-auth-service.herokuapp.com/api/v1/auth';

// //AWS
// const API_URL_ROOT = 'http://auth-lb-1565680508.us-east-2.elb.amazonaws.com/api/v1/auth';

const REGISTER_USER_ENDPOINT = '/register';
const LOGIN_LOCAL_ENDPOINT = '/login';
const LOGIN_FACEBOOK_ENDPOINT = '/facebook';
const GET_CURRENT_USER_ENDPOINT = '/me';
const REFRESH_TOKEN_ENDPOINT = '/refreshToken';
const LOGOUT_ENDPOINT = '/logout';

const userRegisterAuth = data => httpClient.post({ url:  API_URL_ROOT + REGISTER_USER_ENDPOINT, data });
const userLocalLogin = data => httpClient.post({ url: API_URL_ROOT + LOGIN_LOCAL_ENDPOINT, data });
const userFacebookLogin = data => httpClient.post({ url: API_URL_ROOT + LOGIN_FACEBOOK_ENDPOINT, data });
const getCurrentUser = data => httpClient.get({ url: API_URL_ROOT + GET_CURRENT_USER_ENDPOINT, data });
const refreshToken = data => httpClient.post({ url: API_URL_ROOT + REFRESH_TOKEN_ENDPOINT, data });
const logout = data => httpClient.get({ url: API_URL_ROOT + LOGOUT_ENDPOINT, data });

const sessionAPI = {
    userRegisterAuth,
    userLocalLogin,
    userFacebookLogin,
    getCurrentUser,
    refreshToken,
    logout,
};

export default sessionAPI;


/** Test reducer state
* 
*    import { loginSuccessDataMock, loginErrorDataMock } from '../__mocks__/mocks';
*    const login = data => {
*        return new Promise((resolve, reject) => {
*            if (!data) {
*                reject(loginErrorDataMock);
*            } else {
*                resolve(loginSuccessDataMock);
*            }
*        });
*    };
**/