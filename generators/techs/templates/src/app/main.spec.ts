/// <reference path="../../typings/main.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Component} from '@angular/core';
import {Main} from './main';
import {Techs} from './techs/techs';
import {Footer} from './footer';
import {Header} from './header';
import {Title} from './title';
import {describe, it, expect, inject, async, setBaseTestProviders} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {TEST_BROWSER_STATIC_PLATFORM_PROVIDERS, ADDITIONAL_TEST_BROWSER_PROVIDERS} from '@angular/platform-browser/testing';
import {BROWSER_APP_DYNAMIC_PROVIDERS} from '@angular/platform-browser-dynamic';

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

setBaseTestProviders(
  TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
  [
    BROWSER_APP_DYNAMIC_PROVIDERS,
    ADDITIONAL_TEST_BROWSER_PROVIDERS
  ]
);
describe('main component', () => {
  it('should render the header, title, techs and footer', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb
      .overrideDirective(Main, Techs, MockTechs)
      .overrideDirective(Main, Footer, MockFooter)
      .overrideDirective(Main, Header, MockHeader)
      .overrideDirective(Main, Title, MockTitle)
      .createAsync(Main)
      .then(fixture => {
        fixture.detectChanges();
        const main = fixture.nativeElement;
        expect(main.querySelector('Header')).toBeDefined();
        expect(main.querySelector('TitleComponent')).toBeDefined();
        expect(main.querySelector('Techs')).toBeDefined();
        expect(main.querySelector('Footer')).toBeDefined();
      });
  })));
});
