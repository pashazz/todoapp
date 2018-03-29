/**
 * create a copy of the state and add new items from action.response
 * @param state
 * @param action
 * @returns {{}}
 */
const todoById = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_TODOS':
            const nextState = {...state};
            action.response.forEach(todo => {nextState[todo.id] =  todo;});
            return nextState;
        default:
            return state;
    }
};

export default todoById;

/**
 *
 * @param state todoById reducer state
 * @param id todo id
 * @returns a todo item from state object
 */
export const getTodo = (state, id) => {
    return state[id];
};