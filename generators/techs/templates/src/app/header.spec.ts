/// <reference path="../../typings/index.d.ts"/>

import {HeaderComponent} from './header';
import {TestBed} from '@angular/core/testing';

describe('header component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ]
    });
  });

  it('should render \'Fountain Generator\'', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement;
    expect(header.querySelector('a').textContent.trim()).toBe('Fountain Generator');
  });
});
