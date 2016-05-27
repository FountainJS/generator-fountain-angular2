var types = require('../constants/ActionTypes');

function addTodo(text) {
  return {type: types.ADD_TODO, text: text};
}

function deleteTodo(id) {
  return {type: types.DELETE_TODO, id: id};
}

function editTodo(id, text) {
  return {type: types.EDIT_TODO, id: id, text: text};
}

function completeTodo(id) {
  return {type: types.COMPLETE_TODO, id: id};
}

function completeAll() {
  return {type: types.COMPLETE_ALL};
}

function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

function changeVisibility(filter) {
  return {type: filter};
}

module.exports = {
  addTodo: addTodo,
  deleteTodo: deleteTodo,
  editTodo: editTodo,
  completeTodo: completeTodo,
  completeAll: completeAll,
  clearCompleted: clearCompleted,
  changeVisibility: changeVisibility
};
