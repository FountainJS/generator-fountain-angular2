var ng = require('@angular/core');

<% if (sample === 'hello') { -%>
var HelloComponent = require('./hello');
<% } else if (sample === 'techs') { -%>
var MainComponent = require('./main');
<% } else { -%>
var AppComponent = require('./containers/App');
<% } -%>

exports.STATES = [
  {
    name: 'App',
    url: '/',
    component: <% if (sample === 'hello') { %>HelloComponent<% } else if (sample === 'techs') { %>MainComponent<% } else { %>AppComponent<% } %>
  }
];

exports.MyUIRouterConfig = ng.Class({
  constructor: function () {},

  configure: function (uiRouter) {
    uiRouter.urlRouterProvider.otherwise(function () {
      return uiRouter.stateService.go('App');
    });
  }
});
