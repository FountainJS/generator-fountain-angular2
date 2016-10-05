var ng = require('@angular/core');
var ngPlatformBrowser = require('@angular/platform-browser');
<% if (router === 'uirouter') { -%>
var uiRouter = require('ui-router-ng2');
var myRoutes = require('./routes');
<% } else if (router === 'router') { -%>
var myRoutes = require('./routes');
<% } -%>

var HelloComponent = require('./hello');

module.exports = ng.NgModule({
  imports: [
    ngPlatformBrowser.BrowserModule,
<% if (router === 'router') { -%>
    myRoutes.routing
<% } else if (router === 'uirouter') { -%>
    uiRouter.UIRouterModule.forRoot({states: myRoutes.STATES, configClass: myRoutes.MyUIRouterConfig})
<% } -%>
  ],
  declarations: [
<% if (router === 'router') { -%>
    myRoutes.RootComponent,
<% } -%>
    HelloComponent
  ],
<% if (router === 'uirouter') { -%>
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
