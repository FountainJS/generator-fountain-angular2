var ng = require('@angular/core');

module.exports = ng.Component({
  selector: '<%- componentName %>',
  template: `
    <div>
      <h2>{{text}}</div>
    </div>
  `
})
.Class({
  constructor: function <%- componentName %>Controller() {}
});
