/// <reference path="../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Component} from '@angular/core';
import {Main} from './main';
import {Techs} from './techs/techs';
import {Footer} from './footer';
import {Header} from './header';
import {Title} from './title';
import {inject, async, setBaseTestProviders, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'Techs',
  template: ''
})
class MockTechs {}
@Component({
  selector: 'Footer',
  template: ''
})
class MockFooter {}
@Component({
  selector: 'Header',
  template: ''
})
class MockHeader {}
@Component({
  selector: 'Title',
  template: ''
})
class MockTitle {}

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

describe('main component', () => {
  it('should render the header, title, techs and footer', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb
      .overrideDirective(Main, Techs, MockTechs)
      .overrideDirective(Main, Footer, MockFooter)
      .overrideDirective(Main, Header, MockHeader)
      .overrideDirective(Main, Title, MockTitle)
      .createAsync(Main)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        const main = fixture.nativeElement;
        expect(main.querySelector('Header')).toBeDefined();
        expect(main.querySelector('TitleComponent')).toBeDefined();
        expect(main.querySelector('Techs')).toBeDefined();
        expect(main.querySelector('Footer')).toBeDefined();
      });
  })));
});
