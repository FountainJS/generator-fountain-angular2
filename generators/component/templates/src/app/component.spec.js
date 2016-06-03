<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var <%- className %> = require('./<%- name %>');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');

ngTest.describe('<%- componentName %> component', function () {
  ngTest.it('should...', ngTest.async(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(<%- className %>)
      .then(function (fixture) {
        fixture.detectChanges();
      });
  })));
});
