import {<%- className %>} from './<%- name %>';
import {Component} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';

@Component({
  selector: 'mock',
  template: `<div <%- directiveName %>></div>`
})
class MockComponent {}

describe('<%- directiveName %> directive', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [MockComponent]});
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();
  });
});
