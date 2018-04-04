import { v4 } from 'node-uuid';
import * as api from '../api';
import {selectIsFetching} from "../reducers";
import {normalize} from 'normalizr';
import * as schema from "./schema";

export const addTodo = (text) => (dispatch) =>
    api.addTodo(text).then(response =>
    {
        console.log('normailzed response (addTodo):', normalize(response, schema.todo));
        dispatch({ type: 'ADD_TODO_SUCCESS', response : normalize(response, schema.todo)});
    });


export const requestTodos = (filter) => (
    {
      type: 'REQUEST_TODOS',
      filter
    }
);


export const toggleTodo = (id) => (dispatch) =>
    api.toggleTodo(id).then(response =>
    {
        dispatch({type : 'TOGGLE_TODO_SUCCESS', response : normalize(response, schema.todo)})
    });


//Emitted when an API call is received the data
const receiveTodos = (response, filter) =>(
{
    type: 'RECEIVE_TODOS', filter, response
});

//Dispatch requestTodos and then fetchTodos
export const fetchTodos = (filter) => (dispatch, getState) =>
{
    if (selectIsFetching(getState(), filter))
        return Promise.resolve();
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(
        data =>
        {
            console.log('normalized response (fetchTodos): ', normalize(data, schema.arrayOfTodos));
            dispatch(receiveTodos(normalize(data, schema.arrayOfTodos), filter));
        },
        error => {
            dispatch({type: 'FETCH_TODOS_FAILURE', filter,
            message: error.message || 'Something went wrong'});
        });
};

//export const fetchTodos = (filter) => {
//
//return {type: "TEST_FETCH"};
//};