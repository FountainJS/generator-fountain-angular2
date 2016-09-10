var HeaderComponent = require('./header');
var ngTest = require('@angular/core/testing');

describe('header component', () => {
  beforeEach(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ]
    });
  });

  it('should render \'Fountain Generator\'', function () {
    var fixture = ngTest.TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    var header = fixture.nativeElement;
    expect(header.querySelector('a').textContent.trim()).toBe('Fountain Generator');
  });
});
