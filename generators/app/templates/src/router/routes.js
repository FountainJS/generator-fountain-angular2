var ng = require('@angular/core');
var ngRouter = require('@angular/router');
<% if (sample === 'hello') { -%>
var Hello = require('./app/hello');
<% } else if (sample === 'techs') { -%>
var Main = require('./app/main');
<% } else { -%>
var App = require('./app/containers/App');
<% } -%>

module.exports.Root =
  ng.Component({
    selector: 'root',
    template: '<router-outlet></router-outlet>',
    directives: [ngRouter.ROUTER_DIRECTIVES]
  })
  .Class({
    constructor: function () {
    }
  });

module.exports.routes = [
  {
    path: '',
    component: <% if (sample === 'hello') { -%>Hello<% } else if (sample === 'techs') { -%>Main<% } else { -%>App<% } -%>

  }
];
