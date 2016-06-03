<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var <%- className %> = require('./<%- name %>');
var ng = require('@angular/core');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');

var MockComponent = ng.Component({
  selector: 'mock',
  template: `<div <%- directiveName %>></div>`
})
.Class({
  constructor: function () {}
});

ngTest.describe('<%- directiveName %> directive', function () {
  ngTest.it('should render...', ngTest.async(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(MockComponent)
      .then(function (fixture) {
        fixture.detectChanges();
      });
  })));
});
