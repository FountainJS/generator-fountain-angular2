var <%- className %> = require('./<%- name %>');
var ng = require('@angular/core');
var ngTest = require('@angular/core/testing');

var MockComponent = ng.Component({
  selector: 'mock',
  template: `<div <%- directiveName %>></div>`
})
.Class({
  constructor: function () {}
});

describe('<%- directiveName %> directive', function () {
  beforeEach(async(function () {
    ngTest.TestBed.configureTestingModule({declarations: [MockComponent]});
    ngTest.TestBed.compileComponents();
  }));

  it('should render...', function () {
    const fixture = ngTest.TestBed.createComponent(MockComponent);
    fixture.detectChanges();
  });
});
