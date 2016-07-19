var ng = require('@angular/core');
var HeaderComponent = require('../components/Header');
var MainSectionComponent = require('../components/MainSection');

module.exports = ng.Component({
  selector: 'fountain-app',
  template: require('./App.html'),
  directives: [HeaderComponent, MainSectionComponent]
})
.Class({
  constructor: function AppController() {
  }
});
