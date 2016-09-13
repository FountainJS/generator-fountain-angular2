/// <reference path="../../typings/index.d.ts"/>

import {HelloComponent} from './hello';
import {TestBed} from '@angular/core/testing';

describe('hello component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelloComponent
      ]
    });
  });

  it('should render hello world', () => {
    const fixture = TestBed.createComponent(HelloComponent);
    fixture.detectChanges();
    const hello = fixture.nativeElement;
    expect(hello.querySelector('h1').textContent).toBe('Hello World!');
  });
});
