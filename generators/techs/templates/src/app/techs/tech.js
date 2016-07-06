var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'Tech',
  template: require('./tech.html'),
  inputs: ['tech']
})
.Class({
  constructor: function () {}
});
