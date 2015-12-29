require('reflect-metadata');

var ng = require('angular2/bootstrap');

<% if (modules === 'webpack') { -%>
require('./index.scss');

<% } -%>
var Hello = require('./app/hello');

ng.bootstrap(Hello);
