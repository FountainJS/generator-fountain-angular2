var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'Footer',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'footer.html'
<% } else { -%>
  template: require('./footer.html')
<% } -%>
})
.Class({
  constructor: function () {}
});
