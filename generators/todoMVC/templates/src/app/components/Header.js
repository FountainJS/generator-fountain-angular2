var ng = require('@angular/core');
var ngrxStore = require('@ngrx/store');
var actions = require('../actions/index');
var TodoTextInput = require('./TodoTextInput');

module.exports = ng.Component({
  selector: 'Header',
  template:
    '<header class="header">' +
      '<h1>todos</h1>' +
      '<TodoTextInput' +
        ' [newTodo]="true"' +
        ' (onSave)="handleSave($event)"' +
        ' [placeholder]="\'What needs to be done?\'"' +
      '></TodoTextInput>' +
    '</header>',
  directives: [TodoTextInput]
})
.Class({
  constructor: [ngrxStore.Store, function (store) {
    this.store = store;
  }],

  handleSave: function (text) {
    if (text.length !== 0) {
      this.store.dispatch(actions.addTodo(text));
    }
  }
});
