<% if (modules !== 'systemjs') { -%>
require('reflect-metadata');
<% } -%>
require('zone.js');

require('./index.<%- css %>');

<% if (router === 'uirouter') { -%>
var uiRouter = require('ui-router-ng2');
var ngCommon = require('@angular/common');
var MyUIRouterConfig = require('./routes');
<% } else if (router === 'router') { -%>
var ngRouter = require('@angular/router');
var rts = require('./routes');
<% } else { -%>
var MainComponent = require('./app/main');
<% } -%>
var ngCore = require('@angular/core');
var ng = require('@angular/platform-browser-dynamic');
var ngPlatformBrowser = require('@angular/platform-browser');

<% if (modules === 'systemjs') { -%>
var systemEnv = require('@system-env');

if (systemEnv.production) {
<% } else { -%>
if (process.env.NODE_ENV === 'production') {
<% } -%>
  ngCore.enableProdMode();
}

var AppModule = ngCore.NgModule({
<% if (router === 'uirouter') { -%>
  declarations: [uiRouter.UiView],
  imports: [
    ngPlatformBrowser.BrowserModule
  ],
  providers: uiRouter.UIROUTER_PROVIDERS.concat([
    ngCore.provide(ngCommon.LocationStrategy, {useClass: ngCommon.PathLocationStrategy}),
    ngCore.provide(ngCommon.PlatformLocation, {useClass: ngPlatformBrowser.BrowserPlatformLocation}),
    ngCore.provide(uiRouter.UIRouterConfig, {useClass: MyUIRouterConfig})
  ]),
  bootstrap: [uiRouter.UiView]
<% } else if (router === 'router') { -%>
  declarations: [rts.RootComponent].concat(rts.components),
  imports: [
    ngPlatformBrowser.BrowserModule,
    ngRouter.RouterModule.forRoot(rts.routes)
  ],
  bootstrap: [rts.RootComponent]
<% } else { -%>
  declarations: [MainComponent],
  imports: [ngPlatformBrowser.BrowserModule],
  bootstrap: [MainComponent]
<% } -%>
})
.Class({
  constructor: function () {}
});
ng.platformBrowserDynamic().bootstrapModule(AppModule);
