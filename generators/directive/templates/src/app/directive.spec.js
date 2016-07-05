<% if (modules === 'webpack') { -%>
require('zone.js/dist/zone');
<% } -%>
require('zone.js/dist/async-test');
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
  it('should render...', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(MockComponent)
      .then(function (fixture) {
        fixture.detectChanges();
      });
  })));
});
