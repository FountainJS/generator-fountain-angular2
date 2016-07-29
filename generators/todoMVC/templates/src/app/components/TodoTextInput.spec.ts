/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {async, inject, beforeEach, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {TodoTextInputComponent} from './TodoTextInput';

describe('components', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  describe('TodoTextInput', () => {
    it('should render correctly', async(inject([], () => {
      tcb
        .createAsync(TodoTextInputComponent)
        .then((fixture: ComponentFixture<any>) => {
          const TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.text = 'Use ngrx/store';
          TodoTextInputCmp.placeholder = 'What needs to be done?';
          TodoTextInputCmp.editing = false;
          TodoTextInputCmp.newTodo = false;
          fixture.detectChanges();
          const input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          expect(input.placeholder).toBe('What needs to be done?');
          expect(input.value).toBe('Use ngrx/store');
          expect(input.className).not.toContain('edit');
          expect(input.className).not.toContain('new-todo');
        });
    })));

    it('should render correctly when editing=true', async(inject([], () => {
      tcb
        .createAsync(TodoTextInputComponent)
        .then((fixture: ComponentFixture<any>) => {
          const TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.editing = true;
          fixture.detectChanges();
          const input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          expect(input.className).toContain('edit');
        });
    })));

    it('should render correctly when newTodo=true', async(inject([], () => {
      tcb
        .createAsync(TodoTextInputComponent)
        .then((fixture: ComponentFixture<any>) => {
          const TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = true;
          fixture.detectChanges();
          const input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          expect(input.className).toContain('new-todo');
        });
    })));

    it('should update value on change', async(inject([], () => {
      tcb
        .createAsync(TodoTextInputComponent)
        .then((fixture: ComponentFixture<any>) => {
          const TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.editing = true;
          fixture.detectChanges();
          const input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          input.value = 'Use ngrx/store';
          let evt = new CustomEvent('input');
          input.dispatchEvent(evt);
          expect(TodoTextInputCmp.text).toBe('Use ngrx/store');
        });
    })));

    it('should call onSave on handleSubmit', async(inject([], () => {
      tcb
        .createAsync(TodoTextInputComponent)
        .then((fixture: ComponentFixture<any>) => {
          fixture.detectChanges();
          const TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.text = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleSubmit({keyCode: 13});
          expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
        });
    })));

    it('should reset state on handleSubmit if newTodo', async(inject([], () => {
      tcb
        .createAsync(TodoTextInputComponent)
        .then((fixture: ComponentFixture<any>) => {
          const TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = true;
          const input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          input.value = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleSubmit({keyCode: 13});
          fixture.detectChanges();
          expect(input.value).toBe('');
        });
    })));

    it('should call onSave on handleBlur', async(inject([], () => {
      tcb
        .createAsync(TodoTextInputComponent)
        .then((fixture: ComponentFixture<any>) => {
          fixture.detectChanges();
          const TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = false;
          TodoTextInputCmp.text = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleBlur();
          expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
        });
    })));
  });
});
