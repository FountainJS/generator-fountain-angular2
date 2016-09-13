var ng = require('@angular/core');
var ngPlatformBrowser = require('@angular/platform-browser');
<% if (router === 'uirouter') { -%>
var uiRouter = require('ui-router-ng2');
var myRoutes = require('./routes');
<% } else if (router === 'router') { -%>
var myRoutes = require('./routes');
<% } -%>

var TechsModule = require('./techs');

var MainComponent = require('./main');
var HeaderComponent = require('./header');
var TitleComponent = require('./title');
var FooterComponent = require('./footer');

<% if (router === 'uirouter') { -%>
module.exports = uiRouter.UIRouterModule({
<% } else { -%>
module.exports = ng.NgModule({
<% } -%>
  imports: [
    ngPlatformBrowser.BrowserModule,
<% if (router === 'router') { -%>
    myRoutes.routing,
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
  providers: [
    uiRouter.provideUIRouter({configClass: myRoutes.MyUIRouterConfig})
  ],
  states: myRoutes.STATES,
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
