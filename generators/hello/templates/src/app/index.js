var ng = require('@angular/core');
var ngPlatformBrowser = require('@angular/platform-browser');
<% if (router === 'uirouter') { -%>
var uiRouter = require('ui-router-ng2');
var myRoutes = require('./routes');
<% } else if (router === 'router') { -%>
var myRoutes = require('./routes');
<% } -%>

var HelloComponent = require('./hello');

<% if (router === 'uirouter') { -%>
module.exports = uiRouter.UIRouterModule({
<% } else { -%>
module.exports = ng.NgModule({
<% } -%>
  imports: [
<% if (router === 'router') { -%>
    ngPlatformBrowser.BrowserModule,
    myRoutes.routing
<% } else { -%>
    ngPlatformBrowser.BrowserModule
<% } -%>
  ],
  declarations: [
<% if (router === 'router') { -%>
    myRoutes.RootComponent,
<% } -%>
    HelloComponent
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
  bootstrap: [HelloComponent]
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
