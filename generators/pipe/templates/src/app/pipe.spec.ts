/// <reference path="<%- typings %>"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {<%- className %>} from './<%- name %>';
import {describe, it, expect, inject, beforeEachProviders} from '@angular/core/testing';

describe('<%- pipeName %> pipe', () => {
  beforeEachProviders(() => [<%- className %>]);

  it('should...', inject([<%- className %>], pipe => {
    expect(pipe.transform('fountain')).toEqual('FOUNTAIN');
  }));
});
