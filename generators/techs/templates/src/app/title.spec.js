var TitleComponent = require('./title');
var ngTest = require('@angular/core/testing');

describe('title component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        TitleComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render \'Allo, \'Allo!', function () {
    var fixture = ngTest.TestBed.createComponent(TitleComponent);
    fixture.detectChanges();
    var title = fixture.nativeElement;
    expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
  });
});
