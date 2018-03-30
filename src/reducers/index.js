import {combineReducers} from 'redux';

import todoById, * as fromtodobyid from './todobyid';

import createList, * as fromCreateList from './createlist';



const listByFilter = combineReducers(
    {
        all: createList('all'),
        active: createList('active'),
        completed: createList('completed')
    }
);





const todos = combineReducers({todoById, listByFilter});

export default todos;

export const selectTodos = (state, filter) => {
    const ids = fromCreateList.getIds(state.listByFilter[filter]);
    return ids.map(id => fromtodobyid.getTodo(state.todoById, id));
};

export const selectIsFetching = (state, filter) =>
    fromCreateList.selectIsFetching(state.listByFilter[filter]);

export const selectErrorMessage = (state, filter) =>
    fromCreateList.selectErrorMessage(state.listByFilter[filter]);