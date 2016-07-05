/// <reference path="<%- typings %>"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {<%- className %>} from './<%- name %>';
import {inject, addProviders} from '@angular/core/testing';

describe('<%- pipeName %> pipe', () => {
  beforeEach(() => {
    addProviders([<%- className %>]);
  });

  it('should...', inject([<%- className %>], pipe => {
    expect(pipe.transform('fountain')).toEqual('FOUNTAIN');
  }));
});
