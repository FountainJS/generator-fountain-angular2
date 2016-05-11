var ng = require('@angular/core');

module.exports =
  ng.Component({
    selector: 'App',
    template: '<h1>{{ hello }}</h1>'
  })
  .Class({
    constructor: function () {
      this.hello = 'Hello World!';
    }
  });
