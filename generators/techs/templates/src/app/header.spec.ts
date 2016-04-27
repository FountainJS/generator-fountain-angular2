/// <reference path="../../typings/main.d.ts"/>
<% if (modules === 'webpack') { -%>
/// <reference path="../../node_modules/angular2/typings/browser.d.ts"/>
<% } -%>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Header} from './header';
import {describe, it, expect, inject, async, TestComponentBuilder} from 'angular2/testing';

describe('header component', () => {
  it('should render \'Foutain Generator\'', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(Header)
      .then(fixture => {
        fixture.detectChanges();
        const header = fixture.nativeElement;
        expect(header.querySelector('a').textContent.trim()).toBe('Foutain Generator');
      });
  })));
});
