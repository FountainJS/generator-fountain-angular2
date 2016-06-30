var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'Tech',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'tech.html',
<% } else { -%>
  template: require('./tech.html'),
<% } -%>
  inputs: ['tech']
})
.Class({
  constructor: function () {}
});
