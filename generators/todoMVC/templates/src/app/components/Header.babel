import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as actions from '../actions/index';
import {TodoTextInput} from './TodoTextInput';

@Component({
  selector: 'Header',
  template: require('./Header.html'),
  directives: [TodoTextInput]
})
export class Header {
  constructor(store) {
    this.store = store;
  }

  static get parameters() {
    return [[Store]];
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.store.dispatch(actions.addTodo(text));
    }
  }
}
