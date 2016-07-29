import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {TodoItemComponent} from './TodoItem';
import {Observable} from 'rxjs/Rx';
import {FooterComponent} from './Footer';
import * as actions from '../actions/index';

@Component({
  selector: 'fountain-main-section',
  template: require('./MainSection.html'),
  directives: [TodoItemComponent, FooterComponent]
})
export class MainSectionComponent {
  todos: Observable<any>;
  visibilityFilter: Observable<any>;
  filteredTodos: Observable<any>;
  completedCount: Observable<any>;
  activeCount: Observable<any>;

  constructor(public store: Store<any[]>) {
    this.filteredTodos = Observable.combineLatest(store.select('todos'), store.select('visibility'), (todos: any, visibilityFilter: any) => todos.filter(visibilityFilter.filter));
    this.todos = store.select('todos');
    this.visibilityFilter = store.select('visibility');
    this.completedCount = this.todos.map((todos: any) => todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0));
    this.activeCount = this.todos.map((todos: any) => todos.length - (todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0)));
  }

  handleClearCompleted() {
    this.store.dispatch(actions.clearCompleted());
  }

  handleCompleteAll() {
    this.store.dispatch(actions.completeAll());
  }

  handleShow(filter: string) {
    this.store.dispatch(actions.changeVisibility(filter));
  }

  handleChange(id: string) {
    this.store.dispatch(actions.completeTodo(id));
  }

  handleSave(e: any) {
    if (e.text.length === 0) {
      this.store.dispatch(actions.deleteTodo(e.id));
    } else {
      this.store.dispatch(actions.editTodo(e.id, e.text));
    }
  }

  handleDestroy(e: any) {
    this.store.dispatch(actions.deleteTodo(e));
  }
}
