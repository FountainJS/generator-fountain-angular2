import {TechComponent} from './tech';
import {TestBed, async} from '@angular/core/testing';

describe('tech component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TechComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render Gulp', () => {
    const fixture = TestBed.createComponent(TechComponent);
    fixture.componentInstance.tech = {
      title: 'Gulp',
      logo: 'http://fountainjs.io/assets/imgs/gulp.png',
      text1: 'The streaming build system',
      text2: 'Automate and enhance your workflow'
    };
    fixture.detectChanges();
    const tech = fixture.nativeElement;
    expect(tech.querySelector('h3').textContent.trim()).toBe('Gulp');
  });
});
