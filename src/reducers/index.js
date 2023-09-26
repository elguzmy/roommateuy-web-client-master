import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sessionReducer from './sessionReducer';
import profileReducer from './profileReducer';
import roomReducer from './roomReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    profile: profileReducer,
    room: roomReducer,    
    routing: routerReducer
});

export default rootReducer;