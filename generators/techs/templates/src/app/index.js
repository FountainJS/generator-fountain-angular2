var ngCore = require('@angular/core');
<% if (router === 'uirouter') { -%>
var ngCommon = require('@angular/common');
var uiRouter = require('ui-router-ng2');
var myRouterConfig = require('./routes');
<% } else if (router === 'router') { -%>
var myRoutes = require('./routes');
<% } -%>
var ngPlatformBrowser = require('@angular/platform-browser');
var TechsModule = require('./techs');

var MainComponent = require('./main');
var HeaderComponent = require('./header');
var TitleComponent = require('./title');
var FooterComponent = require('./footer');

module.exports = ngCore.NgModule({
  imports: [
    ngPlatformBrowser.BrowserModule,
<% if (router === 'router') { -%>
    myRoutes.routing,
<% } -%>
    TechsModule
  ],
  declarations: [
<% if (router === 'uirouter') { -%>
    uiRouter.UiView,
<% } else if (router === 'router') { -%>
    myRoutes.RootComponent,
<% } -%>
    MainComponent,
    HeaderComponent,
    TitleComponent,
    FooterComponent
  ],
<% if (router === 'uirouter') { -%>
  providers: [
    ...uiRouter.UIROUTER_PROVIDERS,
    ngCore.provide(LocationStrategy, {useClass: PathLocationStrategy}),
    ngCore.provide(PlatformLocation, {useClass: BrowserPlatformLocation}),
    ngCore.provide(UIRouterConfig, {useClass: MyUIRouterConfig})
  ],
  bootstrap: [uiRouter.UiView]
<% } else if (router === 'router') { -%>
  bootstrap: [myRoutes.RootComponent]
<% } else { -%>
  bootstrap: [MainComponent]
<% } -%>
})
.Class({
  constructor: function () {}
});
