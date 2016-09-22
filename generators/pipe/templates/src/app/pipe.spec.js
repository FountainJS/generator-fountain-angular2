var <%- className %> = require('./<%- name %>');
var ngTest = require('@angular/core/testing');

describe('<%- pipeName %> pipe', function () {
  beforeEach(function () {
    ngTest.addProviders([<%- className %>]);
  });

  it('should...', ngTest.inject([<%- className %>], function (pipe) {
    expect(pipe.transform('fountain')).toEqual('FOUNTAIN');
  }));
});
