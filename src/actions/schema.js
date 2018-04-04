import { schema } from 'normalizr';
const text = new schema.Entity('text');
const completed = new schema.Entity('completed');
export const todo = new schema.Entity('todos', {text,completed});
export const arrayOfTodos = new schema.Array(todo);
