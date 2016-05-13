var types = require('../constants/ActionTypes');

exports.addTodo = function (text) {
  return {type: types.ADD_TODO, text: text};
};

exports.deleteTodo = function (id) {
  return {type: types.DELETE_TODO, id: id};
};

exports.editTodo = function (id, text) {
  return {type: types.EDIT_TODO, id: id, text: text};
};

exports.completeTodo = function (id) {
  return {type: types.COMPLETE_TODO, id: id};
};

exports.completeAll = function () {
  return {type: types.COMPLETE_ALL};
};

exports.clearCompleted = function () {
  return {type: types.CLEAR_COMPLETED};
};

exports.changeVisibility = function (filter) {
  return {type: filter};
};
