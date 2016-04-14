/// <reference path="../typings/main.d.ts"/>
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import 'reflect-metadata';
<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } else { -%>
import 'zone.js';
<% } -%>

import {bootstrap} from 'angular2/platform/browser';

import './index.<%- css %>';

import {Main} from './app/main';

bootstrap(Main);
