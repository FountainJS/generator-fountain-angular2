var ng = require('@angular/core');

module.exports =
  ng.Component({
    selector: 'App',
<% if (modules === 'systemjs') { -%>
    moduleId: __moduleName,
    templateUrl: 'hello.html'
<% } else { -%>
    template: require('./hello.html')
<% } -%>
  })
  .Class({
    constructor: function () {
      this.hello = 'Hello World!';
    }
  });
