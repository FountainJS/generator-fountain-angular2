var HelloComponent = require('./hello');
var ngTest = require('@angular/core/testing');

describe('hello component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        HelloComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render hello world', function () {
    var fixture = ngTest.TestBed.createComponent(HelloComponent);
    fixture.detectChanges();
    var hello = fixture.nativeElement;
    expect(hello.querySelector('h1').textContent).toBe('Hello World!');
  });
});
