/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import {<%- className %>} from './<%- name %>';
import {describe, it, expect, inject, beforeEachProviders} from '@angular/core/testing';

describe('<%- serviceName %> service', () => {
  beforeEachProviders(() => [Service]);

  it('should...', inject([<%- className %>], (service: <%- className %>) => {
    expect(service.getData()).toBe(3);
  }));
});
