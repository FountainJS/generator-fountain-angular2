/// <reference path="../../typings/main.d.ts"/>
/// <reference path="../../node_modules/angular2/typings/browser.d.ts"/>

<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import {Title} from './title';
import {describe, it, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';

describe('title component', () => {
  it('should render \'Allo, \'Allo!', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(Title)
      .then(fixture => {
        fixture.detectChanges();
        const title = fixture.nativeElement;
        expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
      });
  }));
});
