<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var Footer = require('./footer');
var ngTest = require('@angular/core/testing');

describe('footer component', function () {
  it('should render \'FountainJS team\'', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(Footer)
      .then(function (fixture) {
        fixture.detectChanges();
        var footer = fixture.nativeElement;
        expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
      });
  })));
});
