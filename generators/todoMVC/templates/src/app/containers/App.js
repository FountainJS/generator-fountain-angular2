var ng = require('@angular/core');
var Header = require('../components/Header');
var MainSection = require('../components/MainSection');

module.exports = ng.Component({
  selector: 'App',
  template: require('./App.html'),
  directives: [Header, MainSection]
})
.Class({
  constructor: function AppController() {
  }
});
