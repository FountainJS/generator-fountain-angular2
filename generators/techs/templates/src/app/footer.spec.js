<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import 'zone.js/dist/async-test';
import Footer from './footer';
import ngTest from '@angular/core/testing';
import ngCompilerTest from '@angular/compiler/testing';

ngTest.describe('footer component', function () {
  ngTest.it('should render \'FountainJS team\'', ngTest.async(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(Footer)
      .then(function (fixture) {
        fixture.detectChanges();
        var footer = fixture.nativeElement;
        ngTest.expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
      });
  })));
});
