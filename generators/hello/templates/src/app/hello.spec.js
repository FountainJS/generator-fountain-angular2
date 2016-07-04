<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var Hello = require('./hello');
var ngTest = require('@angular/core/testing');
var ngPlatformDynamic = require('@angular/platform-browser-dynamic/testing');

ngTest.setBaseTestProviders(ngPlatformDynamic.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, ngPlatformDynamic.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

describe('hello component', function () {
  it('should render hello world', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(Hello)
      .then(function (fixture) {
        fixture.detectChanges();
        var hello = fixture.nativeElement;
        expect(hello.querySelector('h1').textContent).toBe('Hello World!');
      });
  })));
});
