import {TitleComponent} from './title';
import {TestBed, async} from '@angular/core/testing';

describe('title component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TitleComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render \'Allo, \'Allo!', () => {
    const fixture = TestBed.createComponent(TitleComponent);
    fixture.detectChanges();
    const title = fixture.nativeElement;
    expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
  });
});
