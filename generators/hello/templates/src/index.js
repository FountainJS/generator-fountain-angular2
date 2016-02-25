require('reflect-metadata');

var ng = require('angular2/bootstrap');

require('./index.<%- css %>');

var Hello = require('./app/hello');

ng.bootstrap(Hello);
