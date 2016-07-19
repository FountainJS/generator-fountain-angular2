var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'fountain-app',
  template: require('./hello.html')
})
.Class({
  constructor: function () {
    this.hello = 'Hello World!';
  }
});
