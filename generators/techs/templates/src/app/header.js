var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'Header',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: '/header.html'
<% } else { -%>
  template: require('./header.html')
<% } -%>
})
.Class({
  constructor: function () {}
});
