var <%- className %> = require('./<%- name %>');
var ngTest = require('@angular/core/testing');

describe('<%- serviceName %> service', function () {
  beforeEach(function () {
    ngTest.addProviders([Service]);
  });

  it('should...', ngTest.inject([<%- className %>], function (service) {
    expect(service.getData()).toBe(3);
  }));
});
