var TitleComponent = require('./title');
var TestBed = require('@angular/core/testing').TestBed;

describe('title component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TitleComponent
      ]
    });
  });

  it('should render \'Allo, \'Allo!', function () {
    var fixture = TestBed.createComponent(TitleComponent);
    fixture.detectChanges();
    var title = fixture.nativeElement;
    expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
  });
});
