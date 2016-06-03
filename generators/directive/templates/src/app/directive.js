var ng = require('@angular/core');

module.exports = ng.Directive({
  selector: '[<%- directiveName %>]'
})
.Class({
  constructor: function () {}
});
