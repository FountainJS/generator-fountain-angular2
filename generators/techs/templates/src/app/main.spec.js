var ng = require('@angular/core');
var ngTest = require('@angular/core/testing');
var MainComponent = require('./main');

var MockTechsComponent = ng.Component({
  selector: 'fountain-techs',
  template: ''
})
.Class({
  constructor: function () {}
});
var MockFooterComponent = ng.Component({
  selector: 'fountain-footer',
  template: ''
})
.Class({
  constructor: function () {}
});
var MockHeaderComponent = ng.Component({
  selector: 'fountain-header',
  template: ''
})
.Class({
  constructor: function () {}
});
var MockTitleComponent = ng.Component({
  selector: 'fountain-title',
  template: ''
})
.Class({
  constructor: function () {}
});

describe('Main Component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MockTechsComponent,
        MockFooterComponent,
        MockHeaderComponent,
        MockTitleComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render the header, title, techs and footer', function () {
    const fixture = ngTest.TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const main = fixture.nativeElement;
    expect(main.querySelector('fountain-header')).toBeDefined();
    expect(main.querySelector('fountain-title')).toBeDefined();
    expect(main.querySelector('fountain-techs')).toBeDefined();
    expect(main.querySelector('fountain-footer')).toBeDefined();
  });
});
