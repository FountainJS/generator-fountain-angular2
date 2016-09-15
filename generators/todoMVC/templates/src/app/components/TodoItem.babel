import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'fountain-todo-item',
  template: require('./TodoItem.html')
})
export class TodoItemComponent {
  @Input() todo;
  @Output() onDestroy = new EventEmitter(false);
  @Output() onSave = new EventEmitter(false);
  @Output() onChange = new EventEmitter(false);
  editing = false;

  handleSave(text) {
    this.onSave.emit({id: this.todo.id, text});
    this.editing = false;
  }

  handleChange() {
    this.onChange.emit(this.todo.id);
  }

  handleDoubleClick() {
    this.editing = true;
  }

  handleClick() {
    this.onDestroy.emit(this.todo.id);
  }
}
