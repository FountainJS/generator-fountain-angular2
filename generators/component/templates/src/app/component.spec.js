var <%- className %> = require('./<%- name %>');
var TestBed = require('@angular/core/testing').TestBed;

describe('<%- componentName %> component', function () {
  beforeEach(function () {
    TestBed.configureTestingModule({declarations: [<%- componentName %>]});
  });

  it('should render...', function () {
    const fixture = TestBed.createComponent(<%- componentName %>);
    fixture.detectChanges();
  });
});
