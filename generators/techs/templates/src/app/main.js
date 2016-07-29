var ng = require('@angular/core');
var HeaderComponent = require('./header');
var TitleComponent = require('./title');
var TechsComponent = require('./techs/techs');
var FooterComponent = require('./footer');

module.exports = ng.Component({
  selector: 'fountain-app',
  template: require('./main.html'),
  directives: [HeaderComponent, TitleComponent, TechsComponent, FooterComponent]
})
.Class({
  constructor: function () {}
});
