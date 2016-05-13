import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {TodoItem} from './TodoItem';
import {Observable} from 'rxjs/Rx';
import {Footer} from './Footer';
import * as actions from '../actions/index';

@Component({
  selector: 'MainSection',
  template: `
    <section class="main">
      <input *ngIf="(todos | async)?.length"
        class="toggle-all"
        type="checkbox"
        [checked]="(completedCount | async) === (todos | async)?.length"
        (click)="handleCompleteAll()"
        />
      <ul class="todo-list">
        <template ngFor let-todo [ngForOf]="(filteredTodos | async)">
          <TodoItem
            [todo]="todo"
            (onDestroy)="handleDestroy($event)"
            (onChange)="handleChange($event)"
            (onSave)="handleSave($event)"
          ></TodoItem>
        </template>
      </ul>
      <Footer *ngIf="(todos | async)?.length"
        [completedCount]="completedCount | async"
        [activeCount]="activeCount | async"
        [filter]="visibilityFilter | async"
        (onClearCompleted)="handleClearCompleted()"
        (onShow)="handleShow($event)"
      ></Footer>
    </section>
  `,
  directives: [TodoItem, Footer]
})
export class MainSection {
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
