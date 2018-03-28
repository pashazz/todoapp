import { combineReducers } from 'redux';
import todos, { getVisibleTodos} from './todos';
import visibilityFilter from './visibilityFilter';


const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

export default todoApp;

//selector
export const selectVisibleTodos = (state, filter) =>
{
    return getVisibleTodos(state.todos, filter);
};