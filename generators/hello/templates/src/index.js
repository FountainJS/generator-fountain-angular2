require('core-js/client/shim');
require('zone.js/dist/zone');

require('@angular/common');
require('rxjs');

require('./index.<%- css %>');

var ngCore = require('@angular/core');
var ngPbd = require('@angular/platform-browser-dynamic');
var AppModule = require('./app<%- modules === 'systemjs' ? '/index' : '' %>');

<% if (modules === 'systemjs') { -%>
var systemEnv = require('@system-env');

if (systemEnv.production) {
<% } else { -%>
if (process.env.NODE_ENV === 'production') {
<% } -%>
  ngCore.enableProdMode();
} else {
  Error['stackTraceLimit'] = Infinity; // eslint-disable-line dot-notation
  require('zone.js/dist/long-stack-trace-zone');
}

ngPbd.platformBrowserDynamic().bootstrapModule(AppModule);
