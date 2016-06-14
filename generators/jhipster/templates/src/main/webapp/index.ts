/// <reference path="../../../typings/index.d.ts"/>

import 'es6-shim';
import 'reflect-metadata';
<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } else { -%>
import 'zone.js';
<% } -%>

import {bootstrap} from '@angular/platform-browser-dynamic';

import './index.<%- css %>';
import 'bootstrap/dist/css/bootstrap.css<%- modules === 'systemjs' ? '!' : '' %>';

import {Main} from './app/main';

import {enableProdMode} from '@angular/core';

<% if (modules === 'systemjs') { -%>
import {production} from '@system-env';

if (production) {
<% } else { -%>
declare var process: any;
if (process.env.NODE_ENV === 'production') {
<% } -%>
  enableProdMode();
}

bootstrap(Main);
