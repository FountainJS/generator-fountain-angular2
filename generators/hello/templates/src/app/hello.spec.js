<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var Hello = require('./hello');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');
var ngPlatformTest = require('@angular/platform-browser/testing');
var ngPlatformDynamic = require('@angular/platform-browser-dynamic');

ngTest.setBaseTestProviders(
  ngPlatformTest.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
  [
    ngPlatformDynamic.BROWSER_APP_DYNAMIC_PROVIDERS,
    ngPlatformTest.ADDITIONAL_TEST_BROWSER_PROVIDERS
  ]
);
ngTest.describe('hello component', function () {
  ngTest.it('should render hello world', ngTest.async(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(Hello)
      .then(function (fixture) {
        fixture.detectChanges();
        var hello = fixture.nativeElement;
        ngTest.expect(hello.querySelector('h1').textContent).toBe('Hello World!');
      });
  })));
});
