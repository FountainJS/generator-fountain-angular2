<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var Title = require('./title');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');

ngTest.describe('title component', function () {
  ngTest.it('should render \'Allo, \'Allo!', ngTest.async(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(Title)
      .then(function (fixture) {
        fixture.detectChanges();
        var title = fixture.nativeElement;
        ngTest.expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
      });
  })));
});
