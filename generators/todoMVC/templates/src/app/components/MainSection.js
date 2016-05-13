var ng = require('@angular/core');
var ngrxStore = require('@ngrx/store');
var TodoItem = require('./TodoItem');
var rx = require('rxjs/Rx');
var Footer = require('./Footer');
var actions = require('../actions/index');

module.exports = ng.Component({
  selector: 'MainSection',
  template:
    '<section class="main">' +
      '<input *ngIf="(todos | async)?.length"' +
        ' class="toggle-all"' +
        ' type="checkbox"' +
        ' [checked]="(completedCount | async) === (todos | async)?.length"' +
        ' (click)="handleCompleteAll()"' +
        '/>' +
      '<ul class="todo-list">' +
        '<template ngFor let-todo [ngForOf]="(filteredTodos | async)">' +
          '<TodoItem [todo]="todo" (onDestroy)="handleDestroy($event)" (onChange)="handleChange($event)" (onSave)="handleSave($event)"></TodoItem>' +
        '</template>' +
      '</ul>' +
      '<Footer *ngIf="(todos | async)?.length"' +
        ' [completedCount]="completedCount | async"' +
        ' [activeCount]="activeCount | async"' +
        ' [filter]="visibilityFilter | async"' +
        ' (onClearCompleted)="handleClearCompleted()"' +
        ' (onShow)="handleShow($event)"' +
      '></Footer>' +
    '</section>',
  directives: [TodoItem, Footer]
})
.Class({
  constructor: [ngrxStore.Store, function HeaderController(store) { // https://github.com/angular/angular/issues/7507
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
