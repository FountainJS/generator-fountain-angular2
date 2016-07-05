/// <reference path="<%- typings %>"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {<%- className %>} from './<%- name %>';
import {Component} from '@angular/core';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

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
