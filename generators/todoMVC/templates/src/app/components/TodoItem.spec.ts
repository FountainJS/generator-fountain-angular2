/// <reference path="../../../typings/index.d.ts"/>
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {Component, Input} from '@angular/core';
import {describe, it, expect, async, fakeAsync, inject, beforeEach, tick} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {By} from '@angular/platform-browser';
import {TodoTextInput} from './TodoTextInput';
import {TodoItem} from './TodoItem';

@Component({
  selector: 'TodoTextInput',
  template: ''
})
class MockTodoTextInput {
  @Input() newTodo;
  @Input() editing;
  @Input() placeholder;
  @Input() text;
}

describe('components', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  describe('TodoItem', () => {
    it('initial render', async(inject([], () => {
      tcb
        .overrideDirective(TodoItem, TodoTextInput, MockTodoTextInput)
        .createAsync(TodoItem)
        .then((fixture: ComponentFixture<any>) => {
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
    })));

    it('input onChange should call completeTodo', fakeAsync(inject([], () => {
      tcb
        .overrideDirective(TodoItem, TodoTextInput, MockTodoTextInput)
        .createAsync(TodoItem)
        .then((fixture: ComponentFixture<any>) => {
          tick();
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
          tick(50);
          expect(TodoItemCmp.onChange.emit).toHaveBeenCalledWith(0);
        });
    })));

    it('button onClick should call deleteTodo', fakeAsync(inject([], () => {
      tcb
        .overrideDirective(TodoItem, TodoTextInput, MockTodoTextInput)
        .createAsync(TodoItem)
        .then((fixture: ComponentFixture<any>) => {
          tick();
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
          tick(50);
          expect(TodoItemCmp.onDestroy.emit).toHaveBeenCalledWith(0);
        });
    })));

    it('label onDoubleClick should put component in edit state', async(inject([], () => {
      tcb
        .overrideDirective(TodoItem, TodoTextInput, MockTodoTextInput)
        .createAsync(TodoItem)
        .then((fixture: ComponentFixture<any>) => {
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
    })));

    it('edit state render', async(inject([], () => {
      tcb
        .createAsync(TodoItem)
        .then((fixture: ComponentFixture<any>) => {
          const TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.editing = true;
          TodoItemCmp.todo = {
            id: 0,
            text: 'Use ngrx/store',
            completed: false
          };
          fixture.detectChanges();
          const todoTextInput = fixture.debugElement.query(By.css('todotextinput')).componentInstance;
          expect(todoTextInput).not.toBeNull();
          expect(todoTextInput.text).toBe('Use ngrx/store');
          expect(todoTextInput.editing).toBe(true);
        });
    })));

    it('TodoTextInput onSave should call editTodo', async(inject([], () => {
      tcb
        .createAsync(TodoItem)
        .then((fixture: ComponentFixture<any>) => {
          const TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.editing = true;
          fixture.detectChanges();
          spyOn(TodoItemCmp.onSave, 'emit');
          const todoTextInput = fixture.debugElement.query(By.css('todotextinput')).componentInstance;
          spyOn(todoTextInput.onSave, 'emit').and.callThrough();
          spyOn(TodoItemCmp, 'handleSave');
          fixture.detectChanges();
          todoTextInput.onSave.emit('Use ngrx/store');
          expect(TodoItemCmp.handleSave).toHaveBeenCalledWith('Use ngrx/store');
        });
    })));

    it('TodoTextInput onSave should exit component from edit state', async(inject([], () => {
      tcb
        .createAsync(TodoItem)
        .then((fixture: ComponentFixture<any>) => {
          const TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.editing = true;
          fixture.detectChanges();
          spyOn(TodoItemCmp.onSave, 'emit');
          const todoTextInput = fixture.debugElement.query(By.css('todotextinput')).componentInstance;
          spyOn(todoTextInput.onSave, 'emit').and.callThrough();
          spyOn(TodoItemCmp, 'handleSave').and.callFake(() => { // eslint-disable-line max-nested-callbacks
            TodoItemCmp.editing = false;
          });
          todoTextInput.onSave.emit('Use ngrx/store');
          fixture.detectChanges();
          const li = fixture.nativeElement.querySelector('li');
          expect(li.className).toBe('');
        });
    })));
  });
});
