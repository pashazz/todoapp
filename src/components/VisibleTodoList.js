import React, { Component } from 'react';

import { connect } from 'react-redux';
import { toggleTodo, fetchTodos, requestTodos } from '../actions';
import TodoList from './TodoList';
import {selectTodos, selectIsFetching, selectErrorMessage} from "../reducers";
import {withRouter} from 'react-router';


//                              props unpacking
const mapStateToProps = (state, {params}) => {
    let {filter} = params;
    if (!filter)
        filter = 'all';
 return {

     isFetching: selectIsFetching(state, filter),
     errorMessage: selectErrorMessage(state, filter),
     todos: selectTodos(state, filter),
     filter, //if params.filter is undefined, return 'all'
 };


};

/*const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});
*/
class VisibleTodoList extends Component
{
    componentDidMount()
    {
        this.fetchData();
    }
    fetchData() {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.filter !== prevProps.filter)
            this.fetchData();
    }
    render() {
        const {toggleTodo, isLoading, todos, errorMessage} = this.props;
        if (isLoading && !todos.length())
            return <p> Loading... </p>;

        if (errorMessage && !todos.length)
        {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                    />
            );
        }
        return <TodoList onTodoClick={toggleTodo} todos={todos}/>;
    }


}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
    {toggleTodo, fetchTodos}
)(VisibleTodoList));

//withRouter добавляет параметры из роутера в props компонента
//затем это используется в mapStateToProps
export default VisibleTodoList;
