import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import * as actions from '../actions/index';

@Component({
  selector: 'fountain-main-section',
  template: require('./MainSection.html')
})
export class MainSectionComponent {
  constructor(store) {
    this.store = store;
    this.filteredTodos = Observable.combineLatest(store.select('todos'), store.select('visibility'), (todos, visibilityFilter) => todos.filter(visibilityFilter.filter));
    this.todos = store.select('todos');
    this.visibilityFilter = store.select('visibility');
    this.completedCount = this.todos.map(todos => todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0));
    this.activeCount = this.todos.map(todos => todos.length - (todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0)));
  }

  static get parameters() {
    return [[Store]];
  }

  handleClearCompleted() {
    this.store.dispatch(actions.clearCompleted());
  }

  handleCompleteAll() {
    this.store.dispatch(actions.completeAll());
  }

  handleShow(filter) {
    this.store.dispatch(actions.changeVisibility(filter));
  }

  handleChange(id) {
    this.store.dispatch(actions.completeTodo(id));
  }

  handleSave(e) {
    if (e.text.length === 0) {
      this.store.dispatch(actions.deleteTodo(e.id));
    } else {
      this.store.dispatch(actions.editTodo(e.id, e.text));
    }
  }

  handleDestroy(e) {
    this.store.dispatch(actions.deleteTodo(e));
  }
}
