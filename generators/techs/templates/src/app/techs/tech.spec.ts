/// <reference path="../../../typings/main.d.ts"/>
<% if (modules === 'webpack') { -%>
/// <reference path="../../../node_modules/angular2/typings/browser.d.ts"/>
<% } -%>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {TechComponent} from './tech';
import {describe, it, expect, inject, async, TestComponentBuilder} from 'angular2/testing';

describe('tech component', () => {
  it('should render Gulp', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(TechComponent)
      .then(fixture => {
        fixture.componentInstance.tech = {
          key: 'gulp',
          title: 'Gulp',
          logo: 'https://raw.githubusercontent.com/FountainJS/generator-fountain-webapp/master/docs/assets/gulp.png',
          text1: 'The streaming build system',
          text2: 'Automate and enhance your workflow'
        };
        fixture.detectChanges();
        const tech = fixture.nativeElement;
        expect(tech.querySelector('h3').textContent.trim()).toBe('Gulp');
      });
  })));
});
