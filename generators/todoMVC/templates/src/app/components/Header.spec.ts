/// <reference path="../../../typings/index.d.ts"/>

import {Component, Input, Output, EventEmitter} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {HeaderComponent} from './Header';
import {By} from '@angular/platform-browser';
import {TestBed, async} from '@angular/core/testing';

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

describe('Header component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({}, {})
      ],
      declarations: [
        HeaderComponent,
        MockTodoTextInputComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render correctly', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement;
    expect(header.querySelector('header')).not.toBeNull();
    expect(header.querySelector('header').className).toBe('header');
    const h1 = header.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent.trim()).toBe('todos');
    const todoTextInput = fixture.debugElement.query(By.css('fountain-todo-text-input')).componentInstance;
    expect(todoTextInput.newTodo).toBe(true);
    expect(todoTextInput.placeholder).toBe('What needs to be done?');
  });

  it('should call addTodo if length of text is greater than 0', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const HeaderCmp = fixture.componentInstance;
    const todoTextInput = fixture.debugElement.query(By.css('fountain-todo-text-input')).componentInstance;
    const dispatchSpy: jasmine.Spy = spyOn(HeaderCmp.store, 'dispatch');
    todoTextInput.onSave.emit('');
    expect(dispatchSpy.calls.count()).toBe(0);
    todoTextInput.onSave.emit('Use ngrx/store');
    expect(dispatchSpy.calls.count()).toBe(1);
  });
});
