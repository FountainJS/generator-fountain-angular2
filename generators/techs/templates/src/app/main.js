var ng = require('@angular/core');
var Header = require('./header');
var Title = require('./title');
var Techs = require('./techs/techs');
var Footer = require('./footer');

module.exports = ng.Component({
  selector: 'App',
  template: require('./main.html'),
  directives: [Header, Title, Techs, Footer]
})
.Class({
  constructor: function () {}
});
