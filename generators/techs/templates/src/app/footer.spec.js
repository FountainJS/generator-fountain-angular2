var FooterComponent = require('./footer');
var ngTest = require('@angular/core/testing');

describe('footer component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render \'FountainJS team\'', function () {
    var fixture = ngTest.TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    var footer = fixture.nativeElement;
    expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
  });
});
