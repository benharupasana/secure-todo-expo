// reducer + action creators for todo state
export const initialState = {
    todos: [], // { id, text, done, createdAt }
    loading: true
  };
  
  export function todoReducer(state, action) {
    switch (action.type) {
      case 'INIT':
        return { ...state, todos: action.payload || [], loading: false };
      case 'ADD':
        return { ...state, todos: [action.payload, ...state.todos] };
      case 'UPDATE':
        return {
          ...state,
          todos: state.todos.map(t => (t.id === action.payload.id ? {...t, ...action.payload.updates} : t))
        };
      case 'DELETE':
        return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
      case 'TOGGLE':
        return { ...state, todos: state.todos.map(t => (t.id === action.payload ? {...t, done: !t.done} : t)) };
      default:
        return state;
    }
  }