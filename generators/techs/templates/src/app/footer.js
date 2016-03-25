var ng = require('angular2/core');

module.exports = ng.Component({
  selector: 'Footer',
  template:
    '<footer class="footer">' +
      'Build with ♥ by the&nbsp;' +
      '<a href="https://github.com/orgs/FountainJS/people">' +
        'FountainJS team' +
      '</a>' +
    '</footer>'
})
.Class({
  constructor: function FooterController() {} // https://github.com/angular/angular/issues/7507
});
