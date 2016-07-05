<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var <%- className %> = require('./<%- name %>');
var ngTest = require('@angular/core/testing');

describe('<%- componentName %> component', function () {
  it('should...', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(<%- className %>)
      .then(function (fixture) {
        fixture.detectChanges();
      });
  })));
});
