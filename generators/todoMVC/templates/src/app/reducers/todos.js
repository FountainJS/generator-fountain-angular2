var assign = require('object-assign');
var todoFilters = require('../constants/TodoFilters');
var actionTypes = require('../constants/ActionTypes');

var initialTodo = {
  text: 'Use ngrx/store',
  completed: false,
  id: 0
};

var initialVisibility = {
  type: todoFilters.SHOW_ALL,
  filter: function () {
    return true;
  }
};

function todos(state, action) {
  state = state || [initialTodo];
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        {
          id: (state.length === 0) ? 0 : state[0].id + 1,
          completed: false,
          text: action.text
        }
      ].concat(state);

    case actionTypes.DELETE_TODO:
      return state.filter(function (todo) {
        return todo.id !== action.id;
      });

    case actionTypes.EDIT_TODO:
      return state.map(function (todo) {
        return todo.id === action.id ?
          assign({}, todo, {text: action.text}) :
          todo;
      });

    case actionTypes.COMPLETE_TODO:
      return state.map(function (todo) {
        return todo.id === action.id ?
          assign({}, todo, {completed: !todo.completed}) :
          todo;
      });

    case actionTypes.COMPLETE_ALL: {
      var areAllMarked = state.every(function (todo) {
        return todo.completed;
      });
      return state.map(function (todo) {
        return assign({}, todo, {completed: !areAllMarked});
      });
    }

    case actionTypes.CLEAR_COMPLETED:
      return state.filter(function (todo) {
        return todo.completed === false;
      });

    default:
      return state;
  }
}

function visibility(state, action) {
  state = state || initialVisibility;
  switch (action.type) {
    case todoFilters.SHOW_ALL:
      return {
        type: todoFilters.SHOW_ALL,
        filter: function () {
          return true;
        }
      };
    case todoFilters.SHOW_COMPLETED:
      return {
        type: todoFilters.SHOW_COMPLETED,
        filter: function (todo) {
          return todo.completed;
        }
      };
    case todoFilters.SHOW_ACTIVE:
      return {
        type: todoFilters.SHOW_ACTIVE,
        filter: function (todo) {
          return !todo.completed;
        }
      };
    default:
      return state;
  }
}

module.exports = {
  todos: todos,
  visibility: visibility
};
