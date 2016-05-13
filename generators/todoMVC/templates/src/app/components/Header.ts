import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as actions from '../actions/index';
import {TodoTextInput} from './TodoTextInput';

@Component({
  selector: 'Header',
  template: `
    <header class="header">
      <h1>todos</h1>
      <TodoTextInput
        [newTodo]="true"
        (onSave)="handleSave($event)"
        [placeholder]="'What needs to be done?'"
      ></TodoTextInput>
    </header>
  `,
  directives: [TodoTextInput]
})
export class Header {
  constructor(public store: Store<any[]>) {
  }

  handleSave(text: string) {
    if (text.length !== 0) {
      this.store.dispatch(actions.addTodo(text));
    }
  }
}
