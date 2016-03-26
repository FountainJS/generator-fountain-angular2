var ng = require('angular2/core');
var axios = require('axios');
var Tech = require('./tech');

module.exports = ng.Component({
  selector: 'Techs',
  template:
    '<div class="techs-container">' +
      '<h2 class="techs-h2">' +
        'Cooked with all these awesome technologies:' +
      '</h2>' +
      '<div class="techs">' +
        '<Tech *ngFor="#tech of techs" [tech]="tech"></Tech>' +
      '</div>' +
    '</div>',
  directives: [Tech]
})
.Class({
  constructor: function TechsController() { // https://github.com/angular/angular/issues/7507
    var vm = this;

    axios
      .get('app/techs/techs.json')
      .then(function (response) {
        vm.techs = response.data;
      });
  }
});
