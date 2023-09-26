import httpClient from '../lib/httpClient/httpClient'

//Local
// const API_URL_ROOT = 'http://localhost:8001/api/v1/auth';

// //Heroku
const API_URL_ROOT = 'https://roommateuy-auth-service.herokuapp.com/api/v1/auth';
//
// //AWS
// const API_URL_ROOT = 'http://auth-lb-1565680508.us-east-2.elb.amazonaws.com/api/v1/auth';

const REFRESH_TOKEN_ENDPOINT = '/refreshToken';

const refreshToken = data => httpClient.post({ url: API_URL_ROOT + REFRESH_TOKEN_ENDPOINT, data });

const refreshTokenAPI = {
    refreshToken,
};

export default refreshTokenAPI;