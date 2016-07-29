var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'fountain-tech',
  template: require('./tech.html'),
  inputs: ['tech']
})
.Class({
  constructor: function () {}
});
