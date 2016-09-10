var FooterComponent = require('./footer');
var ngTest = require('@angular/core/testing');

describe('footer component', () => {
  beforeEach(() => {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ]
    });
  });

  it('should render \'FountainJS team\'', () => {
    var fixture = ngTest.TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    var footer = fixture.nativeElement;
    expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
  });
});
