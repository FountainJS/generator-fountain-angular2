var ng = require('@angular/core');
var ngRouter = require('@angular/router');
<% if (sample === 'hello') { -%>
var HelloComponent = require('./hello');
<% } else if (sample === 'techs') { -%>
var MainComponent = require('./main');
<% } else { -%>
var AppComponent = require('./containers/App');
<% } -%>

var RootComponent =
  ng.Component({
    selector: 'fountain-root',
    template: '<router-outlet></router-outlet>'
  })
  .Class({
    constructor: function () {}
  });

var routes = [
  {
    path: '',
    component: <% if (sample === 'hello') { %>HelloComponent<% } else if (sample === 'techs') { %>MainComponent<% } else { %>AppComponent<% } %>
  }
];

module.exports = {RootComponent: RootComponent, routes: routes, routing: ngRouter.RouterModule.forRoot(routes)};
