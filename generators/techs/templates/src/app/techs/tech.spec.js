<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import 'zone.js/dist/async-test';
import Tech from './tech';
import ngTest from 'angular2/testing';

ngTest.describe('tech component', function () {
  ngTest.it('should render Gulp', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
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
