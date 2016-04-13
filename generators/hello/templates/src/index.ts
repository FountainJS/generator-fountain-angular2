/// <reference path="../typings/main.d.ts"/>
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from 'angular2/bootstrap';

import './index.<%- css %>';

import {Hello} from './app/hello';

bootstrap(Hello);
