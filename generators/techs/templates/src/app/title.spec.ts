/// <reference path="../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Title} from './title';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

describe('title component', () => {
  it('should render \'Allo, \'Allo!', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(Title)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        const title = fixture.nativeElement;
        expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
      });
  })));
});
