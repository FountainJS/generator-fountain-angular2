/// <reference path="<%- typings %>"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {<%- className %>} from './<%- name %>';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

describe('<%- componentName %> component', () => {
  it('should render...', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(<%- componentName %>)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
      });
  })));
});
