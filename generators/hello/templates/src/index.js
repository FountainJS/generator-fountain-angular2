require('reflect-metadata');
require('zone.js');
require('angular2/bundles/angular2-polyfills');

var ng = require('angular2/bootstrap');

require('./index.<%- css %>');

var Hello = require('./app/hello');

ng.bootstrap(Hello);
