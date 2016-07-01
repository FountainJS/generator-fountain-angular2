var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'TitleComponent',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'title.html'
<% } else { -%>
  template: require('./title.html')
<% } -%>
})
.Class({
  constructor: function () {}
});
