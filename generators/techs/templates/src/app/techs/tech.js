var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'Tech',
<% if (modules === 'systemjs') { -%>
  templateUrl: 'src/app/techs/tech.html',
<% } else { -%>
  template: require('./tech.html'),
<% } -%>
  inputs: ['tech']
})
.Class({
  constructor: function () {}
});
