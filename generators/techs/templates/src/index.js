require('reflect-metadata');
require('zone.js');

var ng = require('angular2/bootstrap');

require('./index.<%- css %>');

var Main = require('./app/main');

ng.bootstrap(Main);
