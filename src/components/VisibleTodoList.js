import React, { Component } from 'react';

import { connect } from 'react-redux';
import { toggleTodo, fetchTodos, requestTodos } from '../actions';
import TodoList from './TodoList';
import {selectTodos, selectIsFetching} from "../reducers";
import {withRouter} from 'react-router';


//                              props unpacking
const mapStateToProps = (state, {params}) => ({
    todos: selectTodos(state, params.filter || 'all'),
    filter: params.filter || 'all', //if params.filter is undefined, return 'all'
});

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
        const {toggleTodo, isLoading, todos} = this.props;
        if (isLoading && !todos.length())
            return <p> Loading... </p>;

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
