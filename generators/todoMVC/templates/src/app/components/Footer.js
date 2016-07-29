var ng = require('@angular/core');
var todoFilters = require('../constants/TodoFilters');

module.exports = ng.Component({
  selector: 'fountain-footer',
  template: require('./Footer.html'),
  inputs: [
    'completedCount',
    'activeCount',
    'filter'
  ],
  outputs: [
    'onClearCompleted',
    'onShow'
  ],
  styles: [
    'a {' +
      'cursor: pointer' +
    '}'
  ]
})
.Class({
  constructor: function () {
    this.onClearCompleted = new ng.EventEmitter(false);
    this.onShow = new ng.EventEmitter(false);
    this.filters = [todoFilters.SHOW_ALL, todoFilters.SHOW_ACTIVE, todoFilters.SHOW_COMPLETED];
    this.filterTitles = {
    };
    this.filterTitles[todoFilters.SHOW_ALL] = 'All';
    this.filterTitles[todoFilters.SHOW_ACTIVE] = 'Active';
    this.filterTitles[todoFilters.SHOW_COMPLETED] = 'Completed';
  },

  handleClear: function (e) {
    this.onClearCompleted.emit(e);
  },

  handleChange: function (filter) {
    this.onShow.emit(filter);
  }
});
