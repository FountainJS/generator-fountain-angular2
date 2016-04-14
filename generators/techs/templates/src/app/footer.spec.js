<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import Footer from './footer';
import ngTest from 'angular2/testing';

ngTest.describe('footer component', function () {
  ngTest.it('should render \'FountainJS team\'', ngTest.injectAsync([ngTest.TestComponentBuilder], function (tcb) {
    return tcb.createAsync(Footer)
      .then(function (fixture) {
        fixture.detectChanges();
        var footer = fixture.nativeElement;
        ngTest.expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
      });
  }));
});
