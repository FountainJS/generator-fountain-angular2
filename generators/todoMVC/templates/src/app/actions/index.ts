import * as types from '../constants/ActionTypes';

export function addTodo(text: string) {
  return {type: types.ADD_TODO, text};
}

export function deleteTodo(id: string) {
  return {type: types.DELETE_TODO, id};
}

export function editTodo(id: string, text: string) {
  return {type: types.EDIT_TODO, id, text};
}

export function completeTodo(id: string) {
  return {type: types.COMPLETE_TODO, id};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

export function changeVisibility(filter: string) {
  return {type: filter};
}
