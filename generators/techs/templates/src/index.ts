/// <reference path="../typings/main.d.ts"/>

import 'reflect-metadata';
<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } else { -%>
import 'zone.js';
<% } -%>

import {bootstrap} from '@angular/platform-browser-dynamic';

import './index.<%- css %>';

import {Main} from './app/main';

bootstrap(Main);
