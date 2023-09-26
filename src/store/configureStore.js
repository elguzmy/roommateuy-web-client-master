import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger'

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunkMiddleware,
        logger,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const configureStore = () => {
    const store = createStoreWithMiddleware(rootReducer);

    return store;
}

export default configureStore;