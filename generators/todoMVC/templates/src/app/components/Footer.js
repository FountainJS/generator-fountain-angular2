var ng = require('@angular/core');
var todoFilters = require('../constants/TodoFilters');

module.exports = ng.Component({
  selector: 'Footer',
  template:
    '<footer class="footer">' +
      '<span class="todo-count">' +
        '<strong>{{activeCount || "No"}}</strong> {{activeCount === 1 ? "item" : "items"}} left' +
      '</span>' +
      '<ul class="filters">' +
        '<template ngFor let-filter [ngForOf]="filters">' +
          '<li key="filter">' +
            '<a [ngClass]="{\'selected\': filter === selectedFilter?.type}" (click)="handleChange(filter)">{{filterTitles[filter]}}</a>' +
          '</li>' +
        '</template>' +
      '</ul>' +
      '<button *ngIf="completedCount > 0"' +
        ' class="clear-completed"' +
        ' (click)="handleClear($event)"' +
        '>' +
        'Clear completed' +
      '</button>' +
    '</footer>',
  inputs: [
    'completedCount',
    'activeCount',
    'selectedFilter: filter'
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
