<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
var ng = require('@angular/core');
var MainComponent = require('./main');
var TechsComponent = require('./techs/techs');
var FooterComponent = require('./footer');
var HeaderComponent = require('./header');
var TitleComponent = require('./title');
var ngTest = require('@angular/core/testing');

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

describe('main component', function () {
  it('should render the header, title, techs and footer', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb
      .overrideDirective(MainComponent, TechsComponent, MockTechsComponent)
      .overrideDirective(MainComponent, FooterComponent, MockFooterComponent)
      .overrideDirective(MainComponent, HeaderComponent, MockHeaderComponent)
      .overrideDirective(MainComponent, TitleComponent, MockTitleComponent)
      .createAsync(MainComponent)
      .then(function (fixture) {
        fixture.detectChanges();
        var main = fixture.nativeElement;
        expect(main.querySelector('fountain-header')).toBeDefined();
        expect(main.querySelector('fountain-title')).toBeDefined();
        expect(main.querySelector('fountain-techs')).toBeDefined();
        expect(main.querySelector('fountain-footer')).toBeDefined();
      });
  })));
});
