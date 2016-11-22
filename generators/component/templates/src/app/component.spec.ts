import {<%- className %>} from './<%- name %>';
import {TestBed, async} from '@angular/core/testing';

describe('<%- componentName %> component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [<%- componentName %>]});
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(<%- componentName %>);
    fixture.detectChanges();
  });
});
