import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TodoTextInputComponent} from './TodoTextInput';

@Component({
  selector: 'fountain-todo-item',
  template: require('./TodoItem.html'),
  directives: [TodoTextInputComponent]
})
export class TodoItemComponent {
  @Input() todo: any;
  @Output() onDestroy: EventEmitter<any> = new EventEmitter(false);
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  @Output() onChange: EventEmitter<any> = new EventEmitter(false);
  editing: boolean = false;

  handleSave(text: string) {
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
