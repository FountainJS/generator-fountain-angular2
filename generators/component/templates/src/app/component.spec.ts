/// <reference path="<%- typings %>"/>

import {<%- className %>} from './<%- name %>';
import {TestBed} from '@angular/core/testing';

describe('<%- componentName %> component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [<%- componentName %>]});
  });

  it('should render...', () => {
    const fixture = TestBed.createComponent(<%- componentName %>);
    fixture.detectChanges();
  });
});
