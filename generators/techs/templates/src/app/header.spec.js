<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var HeaderComponent = require('./header');
var ngTest = require('@angular/core/testing');

describe('header component', () => {
  it('should render \'Fountain Generator\'', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], tcb => {
    tcb.createAsync(HeaderComponent)
      .then(fixture => {
        fixture.detectChanges();
        var header = fixture.nativeElement;
        expect(header.querySelector('a').textContent.trim()).toBe('Fountain Generator');
      });
  })));
});
