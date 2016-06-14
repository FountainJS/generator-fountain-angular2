var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'Navbar',
  template:
    '<nav class="navbar navbar-default" role="navigation">' +
    '  <div class="container">' +
    '    <div class="navbar-header">' +
    '      <a class="navbar-brand logo" href="#/">' +
    '          <img class="logo-img" src="../images/logo-jhipster.png"/>' +
    '          <span>Webapp3</span>' +
    '      </a>' +
    '    </div>' +
    '    <div class="navbar-collapse">' +
    '      <ul class="nav navbar-nav navbar-right">' +
    '        <li>' +
    '          <a>' +
    '          <span class="glyphicon glyphicon-home"></span>' +
    '          <span class="hidden-sm">Home</span>' +
    '          </a>' +
    '        </li>' +
    '        <li class="dropdown pointer">' +
    '          <a class="dropdown-toggle" href="" id="account-menu">' +
    '          <span>' +
    '          <span class="glyphicon glyphicon-user"></span>' +
    '          <span class="hidden-sm">' +
    '          Account' +
    '          </span>' +
    '          <b class="caret"></b>' +
    '          </span>' +
    '          </a>' +
    '          <ul class="dropdown-menu">' +
    '            <li>' +
    '              <a href="" id="login">' +
    '              <span class="glyphicon glyphicon-log-in"></span>&nbsp;' +
    '              <span>Sign in</span>' +
    '              </a>' +
    '            </li>' +
    '            <li>' +
    '              <a>' +
    '              <span class="glyphicon glyphicon-plus-sign"></span>&nbsp;' +
    '              <span>Register</span>' +
    '              </a>' +
    '            </li>' +
    '          </ul>' +
    '        </li>' +
    '      </ul>' +
    '    </div>' +
    '  </div>' +
    '</nav>'
})
.Class({
  constructor: function () {}
});
