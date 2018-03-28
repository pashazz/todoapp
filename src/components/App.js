import React from 'react';
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

const App = ({params}) /* <- this is argument unpacking */ => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={params.filter || 'all'} />
    <Footer />
  </div>
);

export default App;
