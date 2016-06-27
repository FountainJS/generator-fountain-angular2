/// <reference path="../typings/index.d.ts"/>

<% if (modules !== 'systemjs') { -%>
import 'reflect-metadata';
<% } -%>
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';

import './index.<%- css %>';

<% if (router === 'uirouter') { -%>
import {enableProdMode, provide} from '@angular/core';
import {UIRouterConfig, UIROUTER_PROVIDERS, UiView} from 'ui-router-ng2';
import {LocationStrategy, PathLocationStrategy, PlatformLocation} from '@angular/common';
import {BrowserPlatformLocation} from '@angular/platform-browser';
import {MyUIRouterConfig} from './routes';
<% } else { -%>
import {Hello} from './app/hello';
import {enableProdMode} from '@angular/core';
<% } -%>

<% if (modules === 'systemjs') { -%>
import {production} from '@system-env';

if (production) {
<% } else { -%>
declare var process: any;
if (process.env.NODE_ENV === 'production') {
<% } -%>
  enableProdMode();
}

<% if (router === 'uirouter') { -%>
bootstrap(UiView, [
  ...UIROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: PathLocationStrategy}),
  provide(PlatformLocation, {useClass: BrowserPlatformLocation}),
  provide(UIRouterConfig, {useClass: MyUIRouterConfig})
]);
<% } else { -%>
bootstrap(Hello);
<% } -%>
