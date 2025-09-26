import { todoReducer, initialState } from '../src/context/todoReducer';

describe('todoReducer', () => {
  test('INIT loads todos', () => {
    const todos = [{ id: '1', text: 'x' }];
    const res = todoReducer(initialState, { type: 'INIT', payload: todos });
    expect(res.todos).toHaveLength(1);
    expect(res.loading).toBe(false);
  });

  test('ADD adds todo', () => {
    const newTodo = { id: '2', text: 'hello' };
    const res = todoReducer(initialState, { type: 'ADD', payload: newTodo });
    expect(res.todos[0]).toEqual(newTodo);
  });

  test('UPDATE updates todo text', () => {
    const state = { ...initialState, todos: [{ id: 'a', text: 'old' }] };
    const res = todoReducer(state, { type: 'UPDATE', payload: { id: 'a', updates: { text: 'new' } } });
    expect(res.todos.find(t => t.id === 'a').text).toBe('new');
  });

  test('DELETE removes todo', () => {
    const state = { ...initialState, todos: [{ id: 'a', text: 't' }, { id: 'b', text: 'u' }] };
    const res = todoReducer(state, { type: 'DELETE', payload: 'a' });
    expect(res.todos.find(t => t.id === 'a')).toBeUndefined();
    expect(res.todos).toHaveLength(1);
  });
});