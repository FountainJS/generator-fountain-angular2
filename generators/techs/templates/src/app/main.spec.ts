/// <reference path="../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Component} from '@angular/core';
import {MainComponent} from './main';
import {TechsComponent} from './techs/techs';
import {FooterComponent} from './footer';
import {HeaderComponent} from './header';
import {TitleComponent} from './title';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

@Component({
  selector: 'fountain-techs',
  template: ''
})
class MockTechsComponent {}
@Component({
  selector: 'fountain-ooter',
  template: ''
})
class MockFooterComponent {}
@Component({
  selector: 'fountain-header',
  template: ''
})
class MockHeaderComponent {}
@Component({
  selector: 'fountain-title',
  template: ''
})
class MockTitleComponent {}

describe('main component', () => {
  it('should render the header, title, techs and footer', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb
      .overrideDirective(MainComponent, TechsComponent, MockTechsComponent)
      .overrideDirective(MainComponent, FooterComponent, MockFooterComponent)
      .overrideDirective(MainComponent, HeaderComponent, MockHeaderComponent)
      .overrideDirective(MainComponent, TitleComponent, MockTitleComponent)
      .createAsync(MainComponent)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        const main = fixture.nativeElement;
        expect(main.querySelector('fountain-header')).toBeDefined();
        expect(main.querySelector('fountain-title')).toBeDefined();
        expect(main.querySelector('fountain-techs')).toBeDefined();
        expect(main.querySelector('fountain-footer')).toBeDefined();
      });
  })));
});
