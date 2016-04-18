/// <reference path="../../typings/main.d.ts"/>
<% if (modules === 'webpack') { -%>
/// <reference path="../../node_modules/angular2/typings/browser.d.ts"/>
<% } -%>

<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import {Footer} from './footer';
import {describe, it, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';


describe('footer component', () => {
  it('should render \'FountainJS team\'', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(Footer)
      .then(fixture => {
        fixture.detectChanges();
        const footer = fixture.nativeElement;
        expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
      });
  }));
});
