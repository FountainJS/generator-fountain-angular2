var <%- className %> = require('./<%- name %>');
var ngTest = require('@angular/core/testing');

describe('<%- componentName %> component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({declarations: [<%- componentName %>]});
    ngTest.TestBed.compileComponents();
  }));

  it('should render...', function () {
    const fixture = ngTest.TestBed.createComponent(<%- componentName %>);
    fixture.detectChanges();
  });
});
