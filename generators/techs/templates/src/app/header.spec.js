<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var Header = require('./header');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');

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
