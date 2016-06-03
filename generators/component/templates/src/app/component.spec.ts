/// <reference path="<%- typings %>"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {<%- className %>} from './<%- name %>';
import {describe, it, expect, inject, async} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';

describe('<%- componentName %> component', () => {
  it('should render...', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(<%- componentName %>)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
      });
  })));
});
