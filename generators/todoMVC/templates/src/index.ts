/// <reference path="../typings/main.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'todomvc-app-css/index.css<%- modules === 'systemjs' ? '!' : '' %>';
import {provideStore, combineReducers} from '@ngrx/store';

import {todos, visibility, initialTodo, initialVisibility} from './app/reducers/todos';

import {bootstrap} from '@angular/platform-browser-dynamic';

import './index.<%- css %>';
import {App} from './app/containers/App';

import {enableProdMode} from '@angular/core';

<% if (modules === 'systemjs') { -%>
import {production} from '@system-env';

if (production) {
<% } else { -%>
if (process.env.NODE_ENV === 'production') {
<% } -%>
  enableProdMode();
}

bootstrap(App, [
  provideStore(combineReducers({todos, visibility}), {todos: [initialTodo], visibility: initialVisibility})
]);
