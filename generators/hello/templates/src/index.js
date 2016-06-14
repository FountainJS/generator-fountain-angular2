require('reflect-metadata');
require('zone.js');

var ng = require('@angular/platform-browser-dynamic');

require('./index.<%- css %>');

<% if (router === 'uirouter') { -%>
var uiRouter = require('ui-router-ng2');
var ngCommon = require('@angular/common');
var ngPlatformBrowser = require('@angular/platform-browser');
var MyUIRouterConfig = require('./routes');
<% } else { -%>
var Hello = require('./app/hello');
<% } -%>
var ngCore = require('@angular/core');

<% if (modules === 'systemjs') { -%>
var systemEnv = require('@system-env');

if (systemEnv.production) {
<% } else { -%>
if (process.env.NODE_ENV === 'production') {
<% } -%>
  ngCore.enableProdMode();
}

<% if (router === 'uirouter') { -%>
ng.bootstrap(uiRouter.UiView, uiRouter.UIROUTER_PROVIDERS.concat([
  ngCore.provide(ngCommon.LocationStrategy, {useClass: ngCommon.PathLocationStrategy}),
  ngCore.provide(ngCommon.PlatformLocation, {useClass: ngPlatformBrowser.BrowserPlatformLocation}),
  ngCore.provide(uiRouter.UIRouterConfig, {useClass: MyUIRouterConfig})
]));
<% } else { -%>
ng.bootstrap(Hello);
<% } -%>
