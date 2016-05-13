var ng = require('@angular/core');
var TodoTextInput = require('./TodoTextInput');

module.exports = ng.Component({
  selector: 'TodoItem',
  template:
    '<li [ngClass]="{\'editing\': editing, \'completed\': todo?.completed}">' +
      '<TodoTextInput' +
        ' *ngIf="editing"' +
        ' [text]="todo?.text"' +
        ' [editing]="editing"' +
        ' (onSave)="handleSave($event)"' +
        '></TodoTextInput>' +
      '<div class="view" *ngIf="!editing">' +
        '<input' +
          ' class="toggle"' +
          ' type="checkbox"' +
          ' [checked]="todo?.completed"' +
          ' (click)="handleChange()"' +
          '/>' +
        '<label (dblclick)="handleDoubleClick()">{{todo?.text}}</label>' +
        '<button class="destroy" (click)="handleClick()"></button>' +
      '</div>' +
    '</li>',
  inputs: ['todo'],
  outputs: [
    'onDestroy',
    'onSave',
    'onChange'
  ],
  directives: [TodoTextInput]
})
.Class({
  constructor: function TodoItemController() { // https://github.com/angular/angular/issues/7507
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
