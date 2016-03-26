/// <reference path="../typings/main.d.ts"/>
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import 'reflect-metadata';
import 'zone.js';
import 'angular2/bundles/angular2-polyfills';

import {bootstrap} from 'angular2/bootstrap';

import './index.<%- css %>';

import {Main} from './app/main';

bootstrap(Main);
