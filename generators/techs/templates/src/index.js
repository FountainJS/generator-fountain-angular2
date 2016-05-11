require('reflect-metadata');
require('zone.js');

var ng = require('@angular/platform-browser-dynamic');

require('./index.<%- css %>');

var Main = require('./app/main');

ng.bootstrap(Main);
