var ng = require('@angular/core');

module.exports = ng.Pipe({
  name: '<%- pipeName %>'
})
.Class({
  constructor: function () {},
  transform: function (value) {
    return value.toUpperCase();
  }
});
