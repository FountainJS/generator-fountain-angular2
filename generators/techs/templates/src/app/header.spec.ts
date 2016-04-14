/// <reference path="../../typings/main.d.ts"/>
/// <reference path="../../node_modules/angular2/typings/browser.d.ts"/>

<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import {Header} from './header';
import {describe, it, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';

describe('header component', () => {
  it('should render \'Foutain Generator\'', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(Header)
      .then(fixture => {
        fixture.detectChanges();
        const header = fixture.nativeElement;
        expect(header.querySelector('a').textContent.trim()).toBe('Foutain Generator');
      });
  }));
});
