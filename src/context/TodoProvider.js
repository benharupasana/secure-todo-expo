import React, { createContext, useEffect, useReducer } from 'react';
import { todoReducer, initialState } from './todoReducer';
import { loadTodos, saveTodos } from '../storage/storage';

// Context to provide state & dispatch
export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // init load
  useEffect(() => {
    (async () => {
      const data = await loadTodos();
      dispatch({ type: 'INIT', payload: data });
    })();
  }, []);

  // persist on change
  useEffect(() => {
    if (!state.loading) {
      saveTodos(state.todos);
    }
  }, [state.todos, state.loading]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}