import React, { StatelessComponent } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { toggleTodo } from "../actions";

/** @type { StatelessComponent<{onClick, completed, text}> } */
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
    className={completed ? "completed" : ""}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func,
  completed: PropTypes.func,
  text: PropTypes.string
};

/** @type { StatelessComponent<{todos, onTodoClick}> } */
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoClick: PropTypes.func
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
