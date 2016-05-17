/// <reference path="../typings/main.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';

import './index.<%- css %>';

import {Hello} from './app/hello';

import {enableProdMode} from '@angular/core';

<% if (modules === 'systemjs') { -%>
import {production} from '@system-env';

if (production) {
<% } else { -%>
if (process.env.NODE_ENV === 'production') {
<% } -%>
  enableProdMode();
}

bootstrap(Hello);
