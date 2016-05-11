<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import 'zone.js/dist/async-test';
import Hello from './hello';
import ngTest from '@angular/core/testing';
import ngCompilerTest from '@angular/compiler/testing';
import ngPlatformTest from '@angular/platform-browser/testing';
import ngPlatformDynamic from '@angular/platform-browser-dynamic';

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
