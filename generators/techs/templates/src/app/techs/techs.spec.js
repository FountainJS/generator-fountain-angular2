<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import ng from 'angular2/core';
import Techs from './techs';
import Tech from './tech';
import ngTest from 'angular2/testing';

var MockComponent = ng.Component({
  selector: 'Tech',
  template: '',
  inputs: ['tech']
})
.Class({
  constructor: function () {}
});

var techsJson = [
  {
    key: 'gulp',
    title: 'Gulp',
    logo: 'https://raw.githubusercontent.com/FountainJS/generator-fountain-webapp/master/docs/assets/gulp.png',
    text1: 'The streaming build system',
    text2: 'Automate and enhance your workflow'
  },
  {
    key: 'react',
    title: 'React',
    logo: 'https://raw.githubusercontent.com/FountainJS/generator-fountain-webapp/master/docs/assets/react.png',
    text1: 'A JavaScript library for building user interfaces',
    text2: 'A declarative, efficient, and flexible JavaScript library for building user interfaces'
  },
  {
    key: 'angular1',
    title: 'Angular 1',
    logo: 'https://raw.githubusercontent.com/FountainJS/generator-fountain-webapp/master/docs/assets/angular1.png',
    text1: 'HTML enhanced for web apps!',
    text2: 'AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.'
  }
];

ngTest.describe('techs component', function () {
  ngTest.it('should render 3 elements <tech>', ngTest.injectAsync([ngTest.TestComponentBuilder], function (tcb) {
    return tcb
      .overrideDirective(Techs, Tech, MockComponent)
      .createAsync(Techs)
      .then(function (fixture) {
        fixture.componentInstance.techs = techsJson;
        fixture.detectChanges();
        var techs = fixture.nativeElement;
        ngTest.expect(techs.querySelectorAll('tech').length).toBe(3);
      });
  }));
});
