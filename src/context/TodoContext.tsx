import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Todo, FilterState } from '../types/todo';

interface TodoState {
  todos: Todo[];
  filters: FilterState;
  darkMode: boolean;
  user?: string;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTERS'; payload: FilterState }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_USER'; payload: string }
  | { type: 'LOGOUT' };

const initialFilters: FilterState = {
  search: '',
  priority: [],
  type: [],
  status: [],
  tags: [],
  dateRange: {},
};

const initialState: TodoState = {
  todos: [],
  filters: initialFilters,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  user: localStorage.getItem('username') || undefined,
};

const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
} | null>(null);

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case 'SET_USER':
      localStorage.setItem('username', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('username');
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      parsedTodos.forEach((todo: Todo) => {
        dispatch({ type: 'ADD_TODO', payload: todo });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
