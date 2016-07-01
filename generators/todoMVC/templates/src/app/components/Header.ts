import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as actions from '../actions/index';
import {TodoTextInput} from './TodoTextInput';

@Component({
  selector: 'Header',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'Header.html',
<% } else { -%>
  template: require('./Header.html'),
<% } -%>
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
