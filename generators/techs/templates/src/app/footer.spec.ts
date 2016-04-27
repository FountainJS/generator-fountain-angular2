/// <reference path="../../typings/main.d.ts"/>
<% if (modules === 'webpack') { -%>
/// <reference path="../../node_modules/angular2/typings/browser.d.ts"/>
<% } -%>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Footer} from './footer';
import {describe, it, expect, inject, async, TestComponentBuilder} from 'angular2/testing';


describe('footer component', () => {
  it('should render \'FountainJS team\'', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(Footer)
      .then(fixture => {
        fixture.detectChanges();
        const footer = fixture.nativeElement;
        expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
      });
  })));
});
