var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'fountain-todo-item',
  template: require('./TodoItem.html'),
  inputs: ['todo'],
  outputs: [
    'onDestroy',
    'onSave',
    'onChange'
  ]
})
.Class({
  constructor: function () {
    this.onDestroy = new ng.EventEmitter(false);
    this.onSave = new ng.EventEmitter(false);
    this.onChange = new ng.EventEmitter(false);
    this.editing = false;
  },

  handleSave: function (text) {
    this.onSave.emit({id: this.todo.id, text: text});
    this.editing = false;
  },

  handleChange: function () {
    this.onChange.emit(this.todo.id);
  },

  handleDoubleClick: function () {
    this.editing = true;
  },

  handleClick: function () {
    this.onDestroy.emit(this.todo.id);
  }
});
