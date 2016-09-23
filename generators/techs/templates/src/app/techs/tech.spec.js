var TechComponent = require('./tech');
var ngTest = require('@angular/core/testing');

describe('tech component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        TechComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render Gulp', function () {
    var fixture = ngTest.TestBed.createComponent(TechComponent);
    fixture.componentInstance.tech = {
      title: 'Gulp',
      logo: 'http://fountainjs.io/assets/imgs/gulp.png',
      text1: 'The streaming build system',
      text2: 'Automate and enhance your workflow'
    };
    fixture.detectChanges();
    var tech = fixture.nativeElement;
    expect(tech.querySelector('h3').textContent.trim()).toBe('Gulp');
  });
});
