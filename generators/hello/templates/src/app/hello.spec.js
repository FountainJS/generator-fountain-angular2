<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var HelloComponent = require('./hello');
var ngTest = require('@angular/core/testing');

describe('hello component', function () {
  it('should render hello world', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(HelloComponent)
      .then(function (fixture) {
        fixture.detectChanges();
        var hello = fixture.nativeElement;
        expect(hello.querySelector('h1').textContent).toBe('Hello World!');
      });
  })));
});
