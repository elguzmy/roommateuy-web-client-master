import {
    REGISTER_ROOM, REGISTER_ROOM_SUCCESS, REGISTER_ROOM_ERROR,
    GET_USER_ROOMS, GET_USER_ROOMS_SUCCESS, GET_USER_ROOMS_ERROR,
    SEARCH_ROOMS_BY_LOCATION, SEARCH_ROOMS_BY_LOCATION_SUCCESS, SEARCH_ROOMS_BY_LOCATION_ERROR,
    GET_ROOM, GET_ROOM_SUCCESS, GET_ROOM_ERROR,
    GET_FAVOURITE_ROOM, GET_FAVOURITE_ROOM_SUCCESS, GET_FAVOURITE_ROOM_ERROR
} from '../actions/actionTypes';

export const initialState = {
    user_rooms_list: [],
    rooms_search_result: {
        rooms_list: [],
        page: 1,
        totalPages: 1,
        total: 1,
    },
    rooms_search_filters: {
        price_min: null,
        price_max: null,
        date_in: null,
        date_out: null,
        room_type: null,
        details_bathroom_type: null,
        specs_furnished: false,
        specs_wifi: false,
        details_smoking_preferences: false,
        specs_balcony: false,
        specs_air: false,
    },
    room: {
        profile: {},
    },
    favouriteRoom: [],
    roomId: null,
    error: null,
    pending: false,
};


export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROOM:
            return {
                ...state,
                roomId: action.payload,
                pending: true,
            };
        case GET_ROOM_SUCCESS:
            return {
                ...state,
                room: action.payload,
                error: null,
                pending: false,
            };
        case GET_ROOM_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };


        case GET_FAVOURITE_ROOM:
            return {
                ...state,
                pending: true,
            };
        case GET_FAVOURITE_ROOM_SUCCESS:
            return {
                ...state,
                favouriteRoom: action.payload,
                error: null,
                pending: false,
            };
        case GET_FAVOURITE_ROOM_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };

        case REGISTER_ROOM:
            return {
                ...state,
                ...action.payload,
                pending: true,
            };
        case REGISTER_ROOM_SUCCESS:
            return {
                ...state,
                room: action.payload,
                error: null,
                pending: false,
            };
        case REGISTER_ROOM_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };

        case GET_USER_ROOMS:
            return {
                ...state,
                ...action.payload,
                pending: true,
            };
        case GET_USER_ROOMS_SUCCESS:
            return {
                ...state,
                user_rooms_list: action.payload,
                error: null,
                pending: false,
            };
        case GET_USER_ROOMS_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };
            
        case SEARCH_ROOMS_BY_LOCATION:
            const newState = {
                ...state
            };

            if (!!action.payload.isNewSearch) {
                newState.rooms_search_result = initialState.rooms_search_result;
            }

            return {
                ...newState,
                pending: true,
            };
        case SEARCH_ROOMS_BY_LOCATION_SUCCESS:
            const searchResults = {};

            searchResults.page = action.payload.page || 1;
            searchResults.totalPages = action.payload.pages || 1;
            searchResults.total = action.payload.total || 0;

            if (searchResults.page > (state.rooms_search_result.page || 1)) {
                searchResults.rooms_list = state.rooms_search_result.rooms_list.concat(action.payload.docs || []);
            } else {
                searchResults.rooms_list = [...action.payload.docs];
            }

            return {
                ...state,
                rooms_search_result: searchResults,
                error: null,
                pending: false,
            };
        case SEARCH_ROOMS_BY_LOCATION_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };
        default:
            return state;
    }
}
