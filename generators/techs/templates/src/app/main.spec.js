<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import 'zone.js/dist/async-test';
import ng from 'angular2/core';
import Main from './main';
import Techs from './techs/techs';
import Footer from './footer';
import Header from './header';
import Title from './title';
import ngTest from 'angular2/testing';
import providers from 'angular2/platform/testing/browser';

var MockTechs = ng.Component({
  selector: 'Techs',
  template: ''
})
.Class({
  constructor: function () {}
});
var MockFooter = ng.Component({
  selector: 'Footer',
  template: ''
})
.Class({
  constructor: function () {}
});
var MockHeader = ng.Component({
  selector: 'Header',
  template: ''
})
.Class({
  constructor: function () {}
});
var MockTitle = ng.Component({
  selector: 'Title',
  template: ''
})
.Class({
  constructor: function () {}
});

ngTest.describe('main component', function () {
  ngTest.setBaseTestProviders(providers.TEST_BROWSER_PLATFORM_PROVIDERS, providers.TEST_BROWSER_APPLICATION_PROVIDERS);

  ngTest.it('should render the header, title, techs and footer', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb
      .overrideDirective(Main, Techs, MockTechs)
      .overrideDirective(Main, Footer, MockFooter)
      .overrideDirective(Main, Header, MockHeader)
      .overrideDirective(Main, Title, MockTitle)
      .createAsync(Main)
      .then(function (fixture) {
        fixture.detectChanges();
        var main = fixture.nativeElement;
        ngTest.expect(main.querySelector('Header')).toBeDefined();
        ngTest.expect(main.querySelector('TitleComponent')).toBeDefined();
        ngTest.expect(main.querySelector('Techs')).toBeDefined();
        ngTest.expect(main.querySelector('Footer')).toBeDefined();
      });
  })));
});
