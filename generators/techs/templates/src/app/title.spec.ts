/// <reference path="../../typings/main.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Title} from './title';
import {describe, it, expect, inject, async} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';

describe('title component', () => {
  it('should render \'Allo, \'Allo!', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(Title)
      .then(fixture => {
        fixture.detectChanges();
        const title = fixture.nativeElement;
        expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
      });
  })));
});
