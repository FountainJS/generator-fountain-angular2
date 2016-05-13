require('reflect-metadata');
require('zone.js');
require('todomvc-app-css/index.css<%- modules === 'systemjs' ? '!' : '' %>');
var ngrxStore = require('@ngrx/store');

var reducers = require('./app/reducers/todos');

var ng = require('@angular/platform-browser-dynamic');

import './index.<%- css %>';
var App = require('./app/containers/App');

ng.bootstrap(App, [
  ngrxStore.provideStore(ngrxStore.combineReducers({todos: reducers.todos, visibility: reducers.visibility}), {todos: [reducers.initialTodo], visibility: reducers.initialVisibility})
]);
