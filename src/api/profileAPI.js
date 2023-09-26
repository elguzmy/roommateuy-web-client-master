import httpClient from '../lib/httpClient/httpClient'
import { getAuthUserId } from '../lib/httpClient/sessionHelper';

//Local
// const API_URL_ROOT = 'http://localhost:8081/api/v1/profile';
//
// //AWS
// // const API_URL_ROOT = 'http://profile-lb-1885319028.us-east-2.elb.amazonaws.com/api/v1/profile';
//
// //Heroku
const API_URL_ROOT = 'https://roommateuy-profile-service.herokuapp.com/api/v1/profile';

const GET_PROFILE_ENDPOINT = '/:user_id';
const PROFILE_REGISTER_ENDPOINT = '/';
const UPDATE_PROFILE_ENDPOINT = '/:user_id';
const UPLOAD_PROFILE_IMAGE = '/:user_id/uploadProfileImage';
const GET_PROFILE_SUGGESTION_ENDPOINT = '/suggestion/:user_id';

const registerProfile = data => httpClient.post({ url: API_URL_ROOT + PROFILE_REGISTER_ENDPOINT, data });

const getProfile = data => httpClient.get({ url: API_URL_ROOT + GET_PROFILE_ENDPOINT.replace(':user_id', data || getAuthUserId()), data });

const updateProfile = data => httpClient.put({ url: API_URL_ROOT + UPDATE_PROFILE_ENDPOINT.replace(':user_id', getAuthUserId()), data });

const uploadProfileImage = data => httpClient.post({
    url: API_URL_ROOT + UPLOAD_PROFILE_IMAGE.replace(':user_id', getAuthUserId()),
    data,
    config: {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        token: null,
    }
});

const getProfileSuggestion = data => httpClient.post({ url: API_URL_ROOT + GET_PROFILE_SUGGESTION_ENDPOINT.replace(':user_id', data || getAuthUserId()), data });
const checkProfileSuggestionReady = data => httpClient.get({ url: API_URL_ROOT + GET_PROFILE_SUGGESTION_ENDPOINT.replace(':user_id', data || getAuthUserId()), data });

const profileAPI = {
    registerProfile,
    updateProfile,
    getProfile,
    uploadProfileImage,
    getProfileSuggestion,
    checkProfileSuggestionReady
};

export default profileAPI;