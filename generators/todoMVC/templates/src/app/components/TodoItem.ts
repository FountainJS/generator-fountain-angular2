import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TodoTextInput} from './TodoTextInput';

@Component({
  selector: 'TodoItem',
  template: `
    <li [ngClass]="{'editing': editing, 'completed': todo?.completed}">
      <TodoTextInput
        *ngIf="editing"
        [text]="todo?.text"
        [editing]="editing"
        (onSave)="handleSave($event)"
        ></TodoTextInput>
      <div class="view" *ngIf="!editing">
        <input
          class="toggle"
          type="checkbox"
          [checked]="todo?.completed"
          (click)="handleChange()"
          />
        <label (dblclick)="handleDoubleClick()">{{todo?.text}}</label>
        <button class="destroy" (click)="handleClick()"></button>
      </div>
    </li>
  `,
  directives: [TodoTextInput]
})
export class TodoItem {
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
