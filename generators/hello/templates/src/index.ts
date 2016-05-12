/// <reference path="../typings/main.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';

import './index.<%- css %>';

import {Hello} from './app/hello';

bootstrap(Hello);
