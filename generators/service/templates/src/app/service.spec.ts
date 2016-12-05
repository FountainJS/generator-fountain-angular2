import {<%- className %>} from './<%- name %>';
import {inject, addProviders} from '@angular/core/testing';

describe('<%- serviceName %> service', () => {
  beforeEach(() => {
    addProviders([Service]);
  });

  it('should...', inject([<%- className %>], (service: <%- className %>) => {
    expect(service.getData()).toBe(3);
  }));
});
