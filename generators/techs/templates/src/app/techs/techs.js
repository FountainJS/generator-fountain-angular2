var ng = require('@angular/core');
var ngHttp = require('@angular/http');
var Tech = require('./tech');
require('rxjs/Rx');

module.exports = ng.Component({
  selector: 'Techs',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'techs.html',
<% } else { -%>
  template: require('./techs.html'),
<% } -%>
  directives: [Tech],
  providers: [ngHttp.HTTP_PROVIDERS]
})
.Class({
  constructor: [ngHttp.Http, function (http) {
    var vm = this;
    this.http = http;
    vm.getTechs().subscribe(function (result) {
      vm.techs = result;
    });
  }],
  getTechs: function getTechs() { // http://stackoverflow.com/questions/33458481/angular-2-how-to-use-http-in-es5
    return this.http
      .get('app/techs/techs.json')
      .map(function (response) {
        return response.json();
      });
  }
});
