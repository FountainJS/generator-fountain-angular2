require('reflect-metadata');
require('zone.js');

var ng = require('angular2/platform/browser');

require('./index.<%- css %>');

var Main = require('./app/main');

ng.bootstrap(Main);
