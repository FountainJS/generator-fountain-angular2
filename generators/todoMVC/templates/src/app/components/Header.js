var ng = require('@angular/core');
var ngrxStore = require('@ngrx/store');
var actions = require('../actions/index');
var TodoTextInputComponent = require('./TodoTextInput');

module.exports = ng.Component({
  selector: 'fountain-header',
  template: require('./Header.html'),
  directives: [TodoTextInputComponent]
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
