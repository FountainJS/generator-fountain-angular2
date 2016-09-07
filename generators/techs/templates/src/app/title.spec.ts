/// <reference path="../../typings/index.d.ts"/>

import {TitleComponent} from './title';
import {TestBed} from '@angular/core/testing';

describe('title component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TitleComponent
      ]
    });
  });

  it('should render \'Allo, \'Allo!', () => {
    const fixture = TestBed.createComponent(TitleComponent);
    fixture.detectChanges();
    const title = fixture.nativeElement;
    expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
  });
});
