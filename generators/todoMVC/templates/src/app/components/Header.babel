import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as actions from '../actions/index';

@Component({
  selector: 'fountain-header',
  template: require('./Header.html')
})
export class HeaderComponent {
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
