import {
    REGISTER_ROOM, REGISTER_ROOM_SUCCESS, REGISTER_ROOM_ERROR,
    GET_USER_ROOMS, GET_USER_ROOMS_SUCCESS, GET_USER_ROOMS_ERROR,
    SEARCH_ROOMS_BY_LOCATION, SEARCH_ROOMS_BY_LOCATION_SUCCESS, SEARCH_ROOMS_BY_LOCATION_ERROR,
    GET_ROOM, GET_ROOM_SUCCESS, GET_ROOM_ERROR,
    GET_FAVOURITE_ROOM, GET_FAVOURITE_ROOM_SUCCESS, GET_FAVOURITE_ROOM_ERROR
} from './actionTypes';
import roomAPI from '../api/roomAPI';
import profileAPI from "../api/profileAPI";
import history from '../utils/history';

const _register = data => (
    {
        type: REGISTER_ROOM,
        payload: data,
    }
);

const registerSuccess = data => (
    {
        type: REGISTER_ROOM_SUCCESS,
        payload: data,
    }
);

const registerError = data => (
    {
        type: REGISTER_ROOM_ERROR,
        payload: data,
    }
);

// Get user rooms

const _getUserRooms = data => (
    {
        type: GET_USER_ROOMS,
        payload: data,
    }
);

const getUserRoomsSuccess = data => (
    {
        type: GET_USER_ROOMS_SUCCESS,
        payload: data,
    }
);

const getUserRoomsError = data => (
    {
        type: GET_USER_ROOMS_ERROR,
        payload: data,
    }
);

//Search rooms by location
const _searchRoomsByLocation = data => (
    {
        type: SEARCH_ROOMS_BY_LOCATION,
        payload: data,
    }
);

const searchRoomsByLocationSuccess = data => (
    {
        type: SEARCH_ROOMS_BY_LOCATION_SUCCESS,
        payload: data,
    }
);

const searchRoomsByLocationError = data => (
    {
        type: SEARCH_ROOMS_BY_LOCATION_ERROR,
        payload: data,
    }
);

// Get room by id

const _getRoom = data => (
    {
        type: GET_ROOM,
        payload: data,
    }
);

const getRoomSuccess = data => (
    {
        type: GET_ROOM_SUCCESS,
        payload: data,
    }
);

const getRoomError = data => (
    {
        type: GET_ROOM_ERROR,
        payload: data,
    }
);


export function registerRoom(data) {
    return dispatch => {
        dispatch(_register(data));

        return roomAPI.createRoom(data)
            .then(
                res => {
                    dispatch(registerSuccess(res.data));
                    history.push('/listings')
                },
                err => {
                    dispatch(registerError({
                        error: err.response
                    }))
                }
            )
    }
}

export function getUserRooms(data) {
    return dispatch => {
        dispatch(_getUserRooms(data));

        return roomAPI.getUserRooms(data)
            .then(
                res => {
                    dispatch(getUserRoomsSuccess(res.data));
                },
                err => {
                    dispatch(getUserRoomsError({
                        error: err.response
                    }))
                }
            )
    }
}

export function searchRoomsByLocation(data, lat, lng, page, filters = {}) {
    return dispatch => {
        dispatch(_searchRoomsByLocation(Object.assign(data, { rooms_search_filters: filters })));

        return roomAPI.searchRoomsByLocation({ lat, lng, page, filters })
            .then(
                res => {
                    dispatch(searchRoomsByLocationSuccess(res.data));
                },
                err => {
                    dispatch(searchRoomsByLocationError({
                        error: err.response
                    }))
                }
            )
    }
}

export function getRoomById(data, roomId){
    return dispatch => {
        dispatch(_getRoom(roomId));

        return roomAPI.getRoom(data, roomId)
            .then(
                res => {
                    const roomData = res.data;

                    return profileAPI.getProfile(roomData.user_id).then(profileRes => {
                        roomData.profile = profileRes.data;
                        
                        dispatch(getRoomSuccess(res.data));
                    });
                },
                err => {
                    dispatch(getRoomError({
                        error: err.response
                    }))
                }
            )
    }
}

const _getFavouriteRoom = data => (
    {
        type: GET_FAVOURITE_ROOM,
        payload: data,
    }
);

const getFavouriteRoomSuccess = data => (
    {
        type: GET_FAVOURITE_ROOM_SUCCESS,
        payload: data,
    }
);

const getFavouriteRoomError = data => (
    {
        type: GET_FAVOURITE_ROOM_ERROR,
        payload: data,
    }
);

export function getFavouriteRooms(data) {
    return dispatch => {
        dispatch(_getFavouriteRoom(data));

        return roomAPI.getUserRooms(data)
            .then(
                res => {
                    dispatch(getFavouriteRoomSuccess(res.data));
                },
                err => {
                    dispatch(getFavouriteRoomError({
                        error: err.response
                    }))
                }
            )
    }
}