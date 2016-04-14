require('reflect-metadata');
require('zone.js');
require('angular2/bundles/angular2-polyfills');

var ng = require('angular2/platform/browser');

require('./index.<%- css %>');

var Main = require('./app/main');

ng.bootstrap(Main);
