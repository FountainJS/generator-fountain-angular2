var ng = require('@angular/core');
var ngHttp = require('@angular/http');
var Tech = require('./tech');
require('rxjs/Rx');

module.exports = ng.Component({
  selector: 'Techs',
  template:
    '<div class="techs-container">' +
      '<h2 class="techs-h2">' +
        'Cooked with all these awesome technologies:' +
      '</h2>' +
      '<div class="techs">' +
        '<Tech *ngFor="let tech of techs" [tech]="tech"></Tech>' +
      '</div>' +
    '</div>',
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
