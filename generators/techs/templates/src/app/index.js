var ng = require('@angular/core');
var ngPlatformBrowser = require('@angular/platform-browser');
<% if (router === 'uirouter') { -%>
var uiRouter = require('ui-router-ng2');
<% } -%>
var myRoutes = require('./routes');

var TechsModule = require('./techs<%- modules === 'systemjs' ? '/index' : '' %>');

var MainComponent = require('./main');
var HeaderComponent = require('./header');
var TitleComponent = require('./title');
var FooterComponent = require('./footer');

module.exports = ng.NgModule({
  imports: [
    ngPlatformBrowser.BrowserModule,
<% if (router === 'router') { -%>
    myRoutes.routing,
<% } else if (router === 'uirouter') { -%>
    uiRouter.UIRouterModule.forRoot({states: myRoutes.STATES, configClass: myRoutes.MyUIRouterConfig}),
<% } -%>
    TechsModule
  ],
  declarations: [
<% if (router === 'router') { -%>
    myRoutes.RootComponent,
<% } -%>
    MainComponent,
    HeaderComponent,
    TitleComponent,
    FooterComponent
  ],
<% if (router === 'uirouter') { -%>
  bootstrap: [uiRouter.UIView]
<% } else if (router === 'router') { -%>
  bootstrap: [myRoutes.RootComponent]
<% } else { -%>
  bootstrap: [MainComponent]
<% } -%>
<% if (router !== 'uirouter') { -%>
})
.Class({
  constructor: function () {}
});
<% } else { -%>
})(
  ng.Class({
    constructor: function () {}
  })
);
<% } -%>
