import {ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED} from '../constants/ActionTypes';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';

export const initialTodo = {
  text: 'Use ngrx/store',
  completed: false,
  id: 0
};

export const initialVisibility = {type: SHOW_ALL, filter: todo => true};

export const todos = (state: any[] = [initialTodo], action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ];

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      );

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, {text: action.text}) :
          todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, {completed: !todo.completed}) :
          todo
      );

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }));

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
};

export const visibility = (state = initialVisibility, action: any) => {
  switch (action.type) {
    case SHOW_ALL:
      return {type: SHOW_ALL, filter: todo => true};
    case SHOW_COMPLETED:
      return {type: SHOW_COMPLETED, filter: todo => todo.completed};
    case SHOW_ACTIVE:
      return {type: SHOW_ACTIVE, filter: todo => !todo.completed};
    default:
      return state;
  }
};
