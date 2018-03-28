import todo from './todo';
import {combineReducers} from 'redux';
/**
 * Run todo() reducer on an object item with key specified by action ID
 * @param state
 * @param action
 * @returns {{}}
 */
const todoById = (state = {}, action) => {
  switch (action.type) {
      case 'ADD_TODO': case 'TOGGLE_TODO':
          return {
              ...state,
              [action.id] : todo(state[action.id], action)
          };
    default:
      return state;
  }
};

const todoIds = (state = [], action) =>
{
    switch (action.type)
    {
        case 'ADD_TODO':
            return [...state, action.id];
        default:
            return state;
    }
};

const todos = combineReducers({todoById, todoIds});

export default todos;

const selectTodos = (state) =>
    state.todoIds.map(id => state.todoById[id]);

export const getVisibleTodos = (state, filter) => {
    const ids = state.idsByFilter[filter];
    return ids.map(id => state.todoById[id]);
};



