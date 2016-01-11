require('reflect-metadata');

var ng = require('angular2/bootstrap');

<% if (modules === 'webpack') { -%>
require('./index.<%- css %>');

<% } -%>
var Hello = require('./app/hello');

ng.bootstrap(Hello);
