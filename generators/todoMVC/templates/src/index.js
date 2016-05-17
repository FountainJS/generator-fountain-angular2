require('reflect-metadata');
require('zone.js');
require('todomvc-app-css/index.css<%- modules === 'systemjs' ? '!' : '' %>');
var ngrxStore = require('@ngrx/store');

var reducers = require('./app/reducers/todos');

var ng = require('@angular/platform-browser-dynamic');

import './index.<%- css %>';
var App = require('./app/containers/App');

var ngCore = require('@angular/core');

<% if (modules === 'systemjs') { -%>
var systemEnv = require('@system-env');

if (systemEnv.production) {
<% } else { -%>
if (process.env.NODE_ENV === 'production') {
<% } -%>
  ngCore.enableProdMode();
}

ng.bootstrap(App, [
  ngrxStore.provideStore(ngrxStore.combineReducers({todos: reducers.todos, visibility: reducers.visibility}), {todos: [reducers.initialTodo], visibility: reducers.initialVisibility})
]);
