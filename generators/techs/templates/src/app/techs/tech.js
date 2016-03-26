var ng = require('angular2/core');

module.exports = ng.Component({
  selector: 'Tech',
  template:
    '<div class="tech">' +
      '<img class="tech-logo" [src]="tech.logo"/>' +
      '<h3 class="tech-h3">' +
        '{{ tech.title }}' +
      '</h3>' +
      '<p>{{ tech.text1 }}</p>' +
      '<p>{{ tech.text2 }}</p>' +
    '</div>',
  inputs: ['tech']
})
.Class({
  constructor: function TechController() {} // https://github.com/angular/angular/issues/7507
});
