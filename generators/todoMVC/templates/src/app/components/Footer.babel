import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';

@Component({
  selector: 'Footer',
  template: require('./Footer.html'),
  styles: [`
    a {
      cursor: pointer
    }
  `]
})
export class Footer {
  @Input() completedCount;
  @Input() activeCount;
  @Input('filter') selectedFilter;
  @Output() onClearCompleted = new EventEmitter(false);
  @Output() onShow = new EventEmitter(false);
  filters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];
  filterTitles = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Completed'
  };

  handleClear(e) {
    this.onClearCompleted.emit(e);
  }

  handleChange(filter) {
    this.onShow.emit(filter);
  }
}
