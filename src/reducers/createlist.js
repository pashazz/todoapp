import {combineReducers} from 'redux';
/// ids - array of ids sorted by todo status
/// isFetching - if it's been fetched
/// errorMessage - an error message to show
const createList = (filter) => {
    /**
     *
     * @param state
     * @param action
     * @returns list of ids
     */
    const ids = (state = [], action) => {

        switch (action.type) {
            case 'RECEIVE_TODOS':
                if (action.filter !== filter)
                    return state;
                return action.response.map(todo => todo.id);
            case 'ADD_TODO_SUCCESS':
                if (action.filter === 'completed')
                    return state;
                else
                {
                    return [...state, action.response.id];
                }
            default:
                return state;
        }
    };
    /**
     *
     * @param state
     * @param action
     * @returns {boolean}
     */
    const isFetching = (state = false, action) => {
        switch (action.type) {
            case 'REQUEST_TODOS':
                return true;
            case 'RECEIVE_TODOS':
            case 'FETCH_TODOS_FAILURE':
                return false;
            default:
                return state;
        }
    };
    const errorMessage = (state=null, action) =>
    {
        if (filter !== action.filter)
            return state;

        switch (action.type){
            case 'FETCH_TODOS_FAILURE':
                return action.message;
            case 'REQUEST_TODOS': case 'RECEIVE_TODOS':
                return null;
            default:
                return state;

        }
    };

    return combineReducers({ids, isFetching, errorMessage});

};





export default createList;

export const getIds = (state) => state.ids;

export const selectIsFetching = (state) => state.isFetching;

export const selectErrorMessage = (state) => state.errorMessage;