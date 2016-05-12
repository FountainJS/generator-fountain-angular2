<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import 'zone.js/dist/async-test';
import Header from './header';
import ngTest from '@angular/core/testing';
import ngCompilerTest from '@angular/compiler/testing';

ngTest.describe('header component', () => {
  ngTest.it('should render \'Fountain Generator\'', ngTest.async(ngTest.inject([ngCompilerTest.TestComponentBuilder], tcb => {
    tcb.createAsync(Header)
      .then(fixture => {
        fixture.detectChanges();
        var header = fixture.nativeElement;
        ngTest.expect(header.querySelector('a').textContent.trim()).toBe('Fountain Generator');
      });
  })));
});
