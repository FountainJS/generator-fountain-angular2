var ng = require('angular2/core');

module.exports = ng.Component({
  selector: 'Header',
  template:
    '<header class="header">' +
      '<p class="header-title">' +
        '<a href="https://github.com/FountainJS/generator-fountain-webapp" target="_blank">' +
          'Fountain Generator' +
        '</a>' +
      '</p>' +
      '<p class="header-date">' +
        'Generated with FountainJS v<%- version %> on <%- date %>' +
      '</p>' +
    '</header>'
})
.Class({
  constructor: function HeaderController() {} // https://github.com/angular/angular/issues/7507
});
