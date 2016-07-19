import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as actions from '../actions/index';
import {TodoTextInputComponent} from './TodoTextInput';

@Component({
  selector: 'fountain-header',
  template: require('./Header.html'),
  directives: [TodoTextInputComponent]
})
export class HeaderComponent {
  constructor(public store: Store<any[]>) {
  }

  handleSave(text: string) {
    if (text.length !== 0) {
      this.store.dispatch(actions.addTodo(text));
    }
  }
}
