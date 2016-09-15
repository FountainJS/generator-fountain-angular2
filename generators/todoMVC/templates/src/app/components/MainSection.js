var ng = require('@angular/core');
var ngrxStore = require('@ngrx/store');
var rx = require('rxjs/Rx');
var actions = require('../actions/index');

module.exports = ng.Component({
  selector: 'fountain-main-section',
  template: require('./MainSection.html')
})
.Class({
  constructor: [ngrxStore.Store, function (store) {
    this.store = store;
    this.filteredTodos = rx.Observable.combineLatest(store.select('todos'), store.select('visibility'), function (todos, visibilityFilter) {
      return todos.filter(visibilityFilter.filter);
    });
    this.todos = store.select('todos');
    this.visibilityFilter = store.select('visibility');
    this.completedCount = this.todos.map(function (todos) {
      return todos.reduce(function (count, todo) {
        return todo.completed ? count + 1 : count;
      }, 0);
    });
    this.activeCount = this.todos.map(function (todos) {
      return todos.length - (todos.reduce(function (count, todo) {
        return todo.completed ? count + 1 : count;
      }, 0));
    });
  }],

  handleClearCompleted: function () {
    this.store.dispatch(actions.clearCompleted());
  },

  handleCompleteAll: function () {
    this.store.dispatch(actions.completeAll());
  },

  handleShow: function (filter) {
    this.store.dispatch(actions.changeVisibility(filter));
  },

  handleChange: function (id) {
    this.store.dispatch(actions.completeTodo(id));
  },

  handleSave: function (e) {
    if (e.text.length === 0) {
      this.store.dispatch(actions.deleteTodo(e.id));
    } else {
      this.store.dispatch(actions.editTodo(e.id, e.text));
    }
  },

  handleDestroy: function (e) {
    this.store.dispatch(actions.deleteTodo(e));
  }
});
