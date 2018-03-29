import { v4 } from 'node-uuid';
import * as api from '../api';



export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const requestTodos = (filter) => (
    {
      type: 'REQUEST_TODOS',
      filter
    }
);


export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

//Emitted when an API call is received the data
const receiveTodos = (response, filter) =>(
{
    type: 'RECEIVE_TODOS', filter, response
});

export const fetchTodos = (filter) => api.fetchTodos(filter).then(
    data => receiveTodos(data, filter));

//export const fetchTodos = (filter) => {
//
//return {type: "TEST_FETCH"};
//};