/// <reference path="../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Component} from '@angular/core';
import {Main} from './main';
import {Techs} from './techs/techs';
import {Footer} from './footer';
import {Header} from './header';
import {Title} from './title';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

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
