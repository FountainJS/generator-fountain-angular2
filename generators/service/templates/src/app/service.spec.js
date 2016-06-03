<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
var <%- className %> = require('./<%- name %>');
var ngTest = require('@angular/core/testing');

ngTest.describe('<%- serviceName %> service', function () {
  ngTest.beforeEachProviders(function () {
    return [Service];
  });

  ngTest.it('should...', ngTest.inject([<%- className %>], function (service) {
    ngTest.expect(service.getData()).toBe(3);
  }));
});
