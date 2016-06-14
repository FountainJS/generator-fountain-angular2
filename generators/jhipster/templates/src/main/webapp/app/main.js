var ng = require('@angular/core');
var Home = require('./home');
var Navbar = require('./navbar');

module.exports = ng.Component({
  selector: 'App',
  template:
    '<div>' +
    '  <Navbar></Navbar>' +
    '  <div class="container">' +
    '    <Home></Home>' +
    '  </div>' +
    '</div>',
  directives: [Home, Navbar]
})
.Class({
  constructor: function () {}
});
