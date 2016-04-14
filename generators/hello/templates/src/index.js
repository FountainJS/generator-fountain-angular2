require('reflect-metadata');
require('zone.js');

var ng = require('angular2/platform/browser');

require('./index.<%- css %>');

var Hello = require('./app/hello');

ng.bootstrap(Hello);
