var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'App',
  template: require('./hello.html')
})
.Class({
  constructor: function () {
    this.hello = 'Hello World!';
  }
});
