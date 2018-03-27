import React from "react";
import { Provider } from "react-redux";
import {createStore} from 'redux';

import AddTodo from "./AddTodo.jsx";
import TodoList from "./TodoList.jsx";
import Footer from "./Footer.jsx";
import todoApp from "../reducers/";
import {loadState, saveState} from "../localStorage";
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = createStore(
    todoApp,
    persistedState //initial state
);

store.subscribe(throttle(() =>
{
    saveState(
        {todos: store.getState().todos }); //Save to persistent browser cache
}, 1000));

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
