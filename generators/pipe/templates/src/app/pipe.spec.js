<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
var <%- className %> = require('./<%- name %>');
var ngTest = require('@angular/core/testing');

ngTest.describe('<%- pipeName %> pipe', function () {
  ngTest.beforeEachProviders(function () {
    return [<%- className %>];
  });

  ngTest.it('should...', ngTest.inject([<%- className %>], function (pipe) {
    ngTest.expect(pipe.transform('fountain')).toEqual('FOUNTAIN');
  }));
});
