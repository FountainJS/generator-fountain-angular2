var ng = require('@angular/core');

<% if (sample === 'hello') { -%>
var HelloComponent = require('./hello');
<% } else if (sample === 'techs') { -%>
var MainComponent = require('./main');
<% } else { -%>
var AppComponent = require('./containers/App');
<% } -%>

var STATES = [
  {
    name: 'App',
    url: '/',
    component: <% if (sample === 'hello') { %>HelloComponent<% } else if (sample === 'techs') { %>MainComponent<% } else { %>AppComponent<% } %>
  }
];

var MyUIRouterConfig = ng.Class({
  constructor: function () {},

  configure: function (uiRouter) {
    uiRouter.urlRouterProvider.otherwise('App');
  }
});

module.exports = {
  STATES: STATES,
  MyUIRouterConfig: MyUIRouterConfig
};
