var ng = require('@angular/core');
var Header = require('./header');
var Title = require('./title');
var Techs = require('./techs/techs');
var Footer = require('./footer');

module.exports = ng.Component({
  selector: 'App',
  template:
    '<div class="main-container">' +
      '<Header></Header>' +
      '<main class="main">' +
        '<TitleComponent></TitleComponent>' +
        '<Techs></Techs>' +
      '</main>' +
      '<Footer></Footer>' +
    '</div>',
  directives: [Header, Title, Techs, Footer]
})
.Class({
  constructor: function MainController() {} // https://github.com/angular/angular/issues/7507
});
