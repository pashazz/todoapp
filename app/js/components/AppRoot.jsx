import React from "react";
import { Provider } from "react-redux";
import {createStore} from 'redux';

import AddTodo from "./AddTodo.jsx";
import TodoList from "./TodoList.jsx";
import Footer from "./Footer.jsx";
import todoApp from "../reducers/";



const persistedState = {
  todos : [{
      id: '0',
      text: 'welcome back',
      completed: false,
  }]
};

const store = createStore(
    todoApp,
    persistedState
);
const TodoApp = () => (
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
);

export default (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);
