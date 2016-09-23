/// <reference path="../../../typings/index.d.ts"/>

import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TodoItemComponent} from './TodoItem';

@Component({
  selector: 'fountain-todo-text-input',
  template: ''
})
class MockTodoTextInputComponent {
  @Input() newTodo;
  @Input() editing;
  @Input() placeholder;
  @Input() text;
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
}

describe('TodoItem component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent,
        MockTodoTextInputComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render the correct elements', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    fixture.detectChanges();
    const todoItem = fixture.nativeElement;
    const li = todoItem.querySelector('li');
    expect(li).not.toBeNull();
    expect(li.className).toBe('');
    const div = todoItem.querySelector('div');
    expect(div).not.toBeNull();
    expect(div.className).toBe('view');
    const input = todoItem.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.checked).toBe(false);
    const label = todoItem.querySelector('label');
    expect(label).not.toBeNull();
    expect(label.textContent.trim()).toBe('Use ngrx/store');
    const button = todoItem.querySelector('button');
    expect(button).not.toBeNull();
    expect(button.className).toBe('destroy');
  });

  it('should call onChange when click on input', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    fixture.detectChanges();
    const TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    const input = fixture.nativeElement.querySelector('input');
    spyOn(TodoItemCmp.onChange, 'emit');
    const evt = new CustomEvent('click');
    input.dispatchEvent(evt);
    expect(TodoItemCmp.onChange.emit).toHaveBeenCalledWith(0);
  });

  it('should call onDestroy when click on button', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    fixture.detectChanges();
    const TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    const button = fixture.nativeElement.querySelector('button');
    spyOn(TodoItemCmp.onDestroy, 'emit').and.callThrough();
    const evt = new CustomEvent('click');
    button.dispatchEvent(evt);
    expect(TodoItemCmp.onDestroy.emit).toHaveBeenCalledWith(0);
  });

  it(`should change class names to 'editing' when double click on label`, () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    fixture.detectChanges();
    const TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    const label = fixture.nativeElement.querySelector('label');
    spyOn(TodoItemCmp.onDestroy, 'emit').and.callThrough();
    const evt = new CustomEvent('dblclick');
    label.dispatchEvent(evt);
    fixture.detectChanges();
    const li = fixture.nativeElement.querySelector('li');
    expect(li.className).toBe('editing');
  });

  it('should render the correct input when editing is true', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.editing = true;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    fixture.detectChanges();
    const todoTextInput = fixture.debugElement.query(By.css('fountain-todo-text-input')).componentInstance;
    expect(todoTextInput).not.toBeNull();
    expect(todoTextInput.text).toBe('Use ngrx/store');
    expect(todoTextInput.editing).toBe(true);
  });

  it('should call handleSave when onSave event is emitted', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    TodoItemCmp.editing = true;
    fixture.detectChanges();
    spyOn(TodoItemCmp.onSave, 'emit');
    const todoTextInput = fixture.debugElement.query(By.css('fountain-todo-text-input')).componentInstance;
    spyOn(todoTextInput.onSave, 'emit').and.callThrough();
    spyOn(TodoItemCmp, 'handleSave');
    fixture.detectChanges();
    todoTextInput.onSave.emit('Edit todo');
    expect(TodoItemCmp.handleSave).toHaveBeenCalledWith('Edit todo');
  });

  it('should remove class name when onSave event is emitted', () => {
    const fixture = TestBed.createComponent(TodoItemComponent);
    const TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.editing = true;
    fixture.detectChanges();
    spyOn(TodoItemCmp.onSave, 'emit');
    const todoTextInput = fixture.debugElement.query(By.css('fountain-todo-text-input')).componentInstance;
    spyOn(todoTextInput.onSave, 'emit').and.callThrough();
    spyOn(TodoItemCmp, 'handleSave').and.callFake(() => { // eslint-disable-line max-nested-callbacks
      TodoItemCmp.editing = false;
    });
    todoTextInput.onSave.emit('Use ngrx/store');
    fixture.detectChanges();
    const li = fixture.nativeElement.querySelector('li');
    expect(li.className).toBe('');
  });
});
