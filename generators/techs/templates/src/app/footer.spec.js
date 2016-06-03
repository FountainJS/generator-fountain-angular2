<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var Footer = require('./footer');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');

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
