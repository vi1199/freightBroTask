import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import app from './reducers';

export default function configureStore() {
    let store = createStore(app, applyMiddleware(thunk))
    return store
}