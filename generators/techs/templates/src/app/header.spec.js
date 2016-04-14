<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import Header from './header';
import ngTest from 'angular2/testing';

ngTest.describe('header component', () => {
  ngTest.it('should render \'Foutain Generator\'', ngTest.injectAsync([ngTest.TestComponentBuilder], tcb => {
    return tcb.createAsync(Header)
      .then(fixture => {
        fixture.detectChanges();
        var header = fixture.nativeElement;
        ngTest.expect(header.querySelector('a').textContent.trim()).toBe('Foutain Generator');
      });
  }));
});
