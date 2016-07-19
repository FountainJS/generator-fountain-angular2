<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var FooterComponent = require('./footer');
var ngTest = require('@angular/core/testing');

describe('footer component', function () {
  it('should render \'FountainJS team\'', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(FooterComponent)
      .then(function (fixture) {
        fixture.detectChanges();
        var footer = fixture.nativeElement;
        expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
      });
  })));
});
