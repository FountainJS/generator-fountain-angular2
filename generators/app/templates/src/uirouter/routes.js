var ng = require('@angular/core');
<% if (sample === 'hello') { -%>
var Hello = require('./app/hello');
<% } else if (sample === 'techs') { -%>
var Main = require('./app/main');
<% } else { -%>
var App = require('./app/containers/App');
<% } -%>

var INITIAL_STATES = [
  {name: 'App', url: '/', component: <% if (sample === 'hello') { -%>Hello<% } else if (sample === 'techs') { -%>Main<% } else { -%>App<% } -%>}
];

module.exports = ng.Class({
  constructor: function () {},

  configure: function (uiRouter) {
    INITIAL_STATES.forEach(function (state) {
      uiRouter.stateRegistry.register(state);
      uiRouter.stateRegistry.root();
      uiRouter.urlRouterProvider.otherwise(function () {
        uiRouter.stateService.go('App', null, null);
      });
    });
  }
});
