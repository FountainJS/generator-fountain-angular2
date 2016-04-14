<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import Tech from './tech';
import ngTest from 'angular2/testing';

ngTest.describe('tech component', function () {
  ngTest.it('should render Gulp', ngTest.injectAsync([ngTest.TestComponentBuilder], function (tcb) {
    return tcb.createAsync(Tech)
      .then(function (fixture) {
        fixture.componentInstance.tech = {
          key: 'gulp',
          title: 'Gulp',
          logo: 'https://raw.githubusercontent.com/FountainJS/generator-fountain-webapp/master/docs/assets/gulp.png',
          text1: 'The streaming build system',
          text2: 'Automate and enhance your workflow'
        };
        fixture.detectChanges();
        var tech = fixture.nativeElement;
        ngTest.expect(tech.querySelector('h3').textContent.trim()).toBe('Gulp');
      });
  }));
});
