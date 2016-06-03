<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var Tech = require('./tech');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');

ngTest.describe('tech component', function () {
  ngTest.it('should render Gulp', ngTest.async(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(Tech)
      .then(function (fixture) {
        fixture.componentInstance.tech = {
          key: 'gulp',
          title: 'Gulp',
          logo: 'http://fountainjs.io/assets/imgs/gulp.png',
          text1: 'The streaming build system',
          text2: 'Automate and enhance your workflow'
        };
        fixture.detectChanges();
        var tech = fixture.nativeElement;
        ngTest.expect(tech.querySelector('h3').textContent.trim()).toBe('Gulp');
      });
  })));
});
