import React, { Component } from 'react';

import { connect } from 'react-redux';
import { toggleTodo, fetchTodos } from '../actions';
import TodoList from './TodoList';
import {selectVisibleTodos} from "../reducers";
import {withRouter} from 'react-router';


//                              props unpacking
const mapStateToProps = (state, {params}) => ({
    todos: selectVisibleTodos(state, params.filter || 'all'),
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
    render()
    {
     return <TodoList {...this.props}/>
    }

}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
    {onTodoClick: toggleTodo, fetchTodos : fetchTodos}
)(VisibleTodoList));

//withRouter добавляет параметры из роутера в props компонента
//затем это используется в mapStateToProps
export default VisibleTodoList;
