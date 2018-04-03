import { v4 } from 'node-uuid';
import * as api from '../api';
import {selectIsFetching} from "../reducers";


export const addTodo = (text) => (dispatch) =>
    api.addTodo(text).then(response =>
    {
        dispatch({ type: 'ADD_TODO_SUCCESS', response});
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
        dispatch({type : 'TOGGLE_TODO_SUCCESS', response})
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
            dispatch(receiveTodos(data, filter));
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