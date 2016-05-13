import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';

@Component({
  selector: 'Footer',
  template: `
    <footer class="footer">
      <span class="todo-count">
        <strong>{{activeCount || 'No'}}</strong> {{activeCount === 1 ? 'item' : 'items'}} left
      </span>
      <ul class="filters">
        <template ngFor let-filter [ngForOf]="filters">
          <li key="filter">
            <a [ngClass]="{'selected': filter === selectedFilter?.type}" (click)="handleChange(filter)">{{filterTitles[filter]}}</a>
          </li>
        </template>
      </ul>
      <button *ngIf="completedCount > 0"
        class="clear-completed"
        (click)="handleClear($event)"
        >
        Clear completed
      </button>
    </footer>
  `,
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
  @Output() onClearCompleted: EventEmitter<any> = new EventEmitter(false);
  @Output() onShow: EventEmitter<any> = new EventEmitter(false);
  filters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];
  filterTitles = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Completed'
  };

  handleClear(e: any) {
    this.onClearCompleted.emit(e);
  }

  handleChange (filter: string) {
    this.onShow.emit(filter);
  }
}
