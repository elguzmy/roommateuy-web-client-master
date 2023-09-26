import queryString from 'query-string';

import httpClient from '../lib/httpClient/httpClient'
import { getAuthUserId } from "../lib/httpClient/sessionHelper";

//Local
// const API_URL_ROOT = 'http://localhost:8082/api/v1/room';

// //Heroku
const API_URL_ROOT = 'https://roommateuy-room-service.herokuapp.com/api/v1/room';
//
// //AWS
// const API_URL_ROOT = 'http://auth-lb-1565680508.us-east-2.elb.amazonaws.com/api/v1/room';

const ROOM_CREATE_ENDPOINT = '/';
const GET_USER_ROOMS = '/';
const GET_ROOM = '/';
const ROOM_SEARCH_ENDPOINT = '/search/location';

export const ROOM_UPLOAD_IMAGE_URL = API_URL_ROOT + '/mediaUpload';

const createRoom = data => httpClient.post({ url: API_URL_ROOT + ROOM_CREATE_ENDPOINT, data });

const searchRoomsByLocation = ({ lat, lng, page = 1, filters = {} }) => {
    let url;

    url = `${API_URL_ROOT}${ROOM_SEARCH_ENDPOINT}?${queryString.stringify({ lat, lng, page })}`;

    if (Object.keys(filters).length) {
        url += `&${queryString.stringify(filters, { sort: false })}`;
    }

    return httpClient.get({ url: url });
};

const getUserRooms = data => httpClient.get({ url: `${API_URL_ROOT}${GET_USER_ROOMS}?user_id=${getAuthUserId()}`, data });
const getRoom = (data, roomId) => httpClient.get({ url: `${API_URL_ROOT}${GET_ROOM}${roomId}`, data });


const roomAPI = {
    createRoom,
    searchRoomsByLocation,
    getUserRooms,
    getRoom
};

export default roomAPI;