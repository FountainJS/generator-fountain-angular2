<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import 'zone.js/dist/async-test';
import Hello from './hello';
import ngTest from 'angular2/testing';
import providers from 'angular2/platform/testing/browser';

ngTest.describe('hello component', function () {
  ngTest.setBaseTestProviders(providers.TEST_BROWSER_PLATFORM_PROVIDERS, providers.TEST_BROWSER_APPLICATION_PROVIDERS);

  ngTest.it('should render hello world', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(Hello)
      .then(function (fixture) {
        fixture.detectChanges();
        var hello = fixture.nativeElement;
        ngTest.expect(hello.querySelector('h1').textContent).toBe('Hello World!');
      });
  })));
});
