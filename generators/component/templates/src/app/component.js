var ng = require('@angular/core');

module.exports = ng.Component({
  selector: '<%- componentName %>',
  template: require('./<%- name %>.html')
})
.Class({
  constructor: function <%- componentName %>Controller() {}
});
