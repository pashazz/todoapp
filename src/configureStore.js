import {loadState, saveState} from "./localStorage";
import {createStore, applyMiddleware } from 'redux';
import logger from 'redux-log-diff';

import throttle from 'lodash/throttle';
import todoApp from './reducers';

const myPromiseMiddleware = (store) => (next) => (action) =>
{
    if (typeof action.then === 'function')
        return action.then(next); //as if then(result => next(result))
    else
        return next(action);


};

const configureStore = () => {


    const store = createStore(
        todoApp,
        applyMiddleware(myPromiseMiddleware, logger)
    );

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos,
        });
    }, 1000));
    return store;

};

export default configureStore;
