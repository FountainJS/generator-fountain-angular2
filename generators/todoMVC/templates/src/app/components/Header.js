var ng = require('@angular/core');
var ngrxStore = require('@ngrx/store');
var actions = require('../actions/index');
var TodoTextInput = require('./TodoTextInput');

module.exports = ng.Component({
  selector: 'Header',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'Header.html',
<% } else { -%>
  template: require('./Header.html'),
<% } -%>
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
