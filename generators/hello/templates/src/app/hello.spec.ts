/// <reference path="../../typings/index.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Hello} from './hello';
import {describe, it, expect, inject, async, setBaseTestProviders} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {TEST_BROWSER_STATIC_PLATFORM_PROVIDERS, ADDITIONAL_TEST_BROWSER_PROVIDERS} from '@angular/platform-browser/testing';
import {BROWSER_APP_DYNAMIC_PROVIDERS} from '@angular/platform-browser-dynamic';

setBaseTestProviders(
  TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
  [
    BROWSER_APP_DYNAMIC_PROVIDERS,
    ADDITIONAL_TEST_BROWSER_PROVIDERS
  ]
);
describe('hello component', () => {
  it('should render hello world', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(Hello)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        const hello = fixture.nativeElement;
        expect(hello.querySelector('h1').textContent).toBe('Hello World!');
      });
  })));
});
