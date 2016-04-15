/// <reference path="../../../typings/main.d.ts"/>
<% if (modules === 'webpack') { -%>
/// <reference path="../../../node_modules/angular2/typings/browser.d.ts"/>
<% } -%>

<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import {Component, Input} from 'angular2/core';
import {Techs, Tech} from './techs';
import {TechComponent} from './tech';
import {describe, it, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';

@Component({
  selector: 'Tech',
  template: ''
})
class MockComponent {
  @Input() public tech: Tech;
}

const techsJson = [
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

describe('techs component', () => {
  it('should render 3 elements <tech>', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .overrideDirective(Techs, TechComponent, MockComponent)
      .createAsync(Techs)
      .then(fixture => {
        fixture.componentInstance.techs = techsJson;
        fixture.detectChanges();
        const techs = fixture.nativeElement;
        expect(techs.querySelectorAll('tech').length).toBe(3);
      });
  }));
});
