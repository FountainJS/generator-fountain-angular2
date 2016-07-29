var ng = require('@angular/core');
<% if (sample === 'hello') { -%>
var HelloComponent = require('./app/hello');
<% } else if (sample === 'techs') { -%>
var MainComponent = require('./app/main');
<% } else { -%>
var AppComponent = require('./app/containers/App');
<% } -%>

var INITIAL_STATES = [
  {name: 'App', url: '/', component: <% if (sample === 'hello') { -%>HelloComponent<% } else if (sample === 'techs') { -%>MainComponent<% } else { -%>AppComponent<% } -%>}
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
