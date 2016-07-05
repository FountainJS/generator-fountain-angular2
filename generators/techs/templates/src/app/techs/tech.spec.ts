/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {TechComponent} from './tech';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

describe('tech component', () => {
  it('should render Gulp', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(TechComponent)
      .then((fixture: ComponentFixture<any>) => {
        fixture.componentInstance.tech = {
          key: 'gulp',
          title: 'Gulp',
          logo: 'http://fountainjs.io/assets/imgs/gulp.png',
          text1: 'The streaming build system',
          text2: 'Automate and enhance your workflow'
        };
        fixture.detectChanges();
        const tech = fixture.nativeElement;
        expect(tech.querySelector('h3').textContent.trim()).toBe('Gulp');
      });
  })));
});
