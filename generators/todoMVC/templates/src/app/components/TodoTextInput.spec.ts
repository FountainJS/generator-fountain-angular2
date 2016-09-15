/// <reference path="../../../typings/index.d.ts"/>

import {TodoTextInputComponent} from './TodoTextInput';
import {TestBed, fakeAsync, tick, async} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

describe('TodoTextInput component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        TodoTextInputComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render correctly', fakeAsync(() => {
    const fixture = TestBed.createComponent(TodoTextInputComponent);
    const TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.text = 'Use ngrx/store';
    TodoTextInputCmp.placeholder = 'What needs to be done?';
    TodoTextInputCmp.editing = false;
    TodoTextInputCmp.newTodo = false;
    fixture.detectChanges();
    tick();
    const input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe('What needs to be done?');
    expect(input.value).toBe('Use ngrx/store');
    expect(input.className).not.toContain('edit');
    expect(input.className).not.toContain('new-todo');
  }));

  it('should render correctly when editing=true', () => {
    const fixture = TestBed.createComponent(TodoTextInputComponent);
    const TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.editing = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.className).toContain('edit');
  });

  it('should render correctly when newTodo=true', () => {
    const fixture = TestBed.createComponent(TodoTextInputComponent);
    const TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.newTodo = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.className).toContain('new-todo');
  });

  it('should update value on change', () => {
    const fixture = TestBed.createComponent(TodoTextInputComponent);
    const TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.editing = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    input.value = 'Use ngrx/store';
    input.dispatchEvent(new CustomEvent('input'));
    expect(TodoTextInputCmp.text).toBe('Use ngrx/store');
  });

  it('should call onSave on handleSubmit', () => {
    const fixture = TestBed.createComponent(TodoTextInputComponent);
    fixture.detectChanges();
    const TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.text = 'Use ngrx/store';
    spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
    TodoTextInputCmp.handleSubmit({keyCode: 13});
    expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
  });

  it('should reset state on handleSubmit if newTodo', () => {
    const fixture = TestBed.createComponent(TodoTextInputComponent);
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

  it('should call onSave on handleBlur', () => {
    const fixture = TestBed.createComponent(TodoTextInputComponent);
    fixture.detectChanges();
    const TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.newTodo = false;
    TodoTextInputCmp.text = 'Use ngrx/store';
    spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
    TodoTextInputCmp.handleBlur();
    expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
  });
});
