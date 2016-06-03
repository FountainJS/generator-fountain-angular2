/// <reference path="<%- typings %>"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {<%- className %>} from './<%- name %>';
import {Component} from '@angular/core';
import {describe, it, expect, inject, async} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';

@Component({
  selector: 'mock',
  template: `<div <%- directiveName %>></div>`
})
class MockComponent {}

describe('<%- directiveName %> directive', () => {
  it('should render...', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(MockComponent)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
      });
  })));
});
