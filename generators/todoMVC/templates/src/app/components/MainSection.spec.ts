/// <reference path="../../../typings/index.d.ts"/>

import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {StoreModule, combineReducers} from '@ngrx/store';
import {todos, visibility} from '../reducers/todos';
import {MainSectionComponent} from './MainSection';
import {TodoItemComponent} from './TodoItem';
import {TodoTextInputComponent} from './TodoTextInput';
import {FooterComponent} from './Footer';
import * as actions from '../actions/index';
import {SHOW_ALL, SHOW_COMPLETED} from '../constants/TodoFilters';

@Component({
  selector: 'fountain-todo-item',
  template: ''
})
class MockTodoItemComponent {
  @Input() todo;
}

@Component({
  selector: 'fountain-footer',
  template: ''
})
class MockFooterComponent {
  @Input() completedCount;
  @Input() activeCount;
  @Input() filter;
  @Output() onClearCompleted: EventEmitter<any> = new EventEmitter(false);
  @Output() onShow: EventEmitter<any> = new EventEmitter(false);
}

const store = StoreModule.provideStore(combineReducers({todos, visibility}), {});

describe('MainSection component', () => {
  describe('mocked', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          store
        ],
        declarations: [
          MainSectionComponent,
          MockTodoItemComponent,
          MockFooterComponent
        ]
      });
      TestBed.compileComponents();
    }));

    it('should render container', () => {
      const fixture = TestBed.createComponent(MainSectionComponent);
      fixture.detectChanges();
      const main = fixture.nativeElement;
      expect(main.querySelector('section')).not.toBeNull();
      expect(main.querySelector('section').className).toBe('main');
    });

    describe('toggle all input', () => {
      it('should render', () => {
        const fixture = TestBed.createComponent(MainSectionComponent);
        fixture.detectChanges();
        const main = fixture.nativeElement;
        const input = main.querySelector('input');
        expect(input).not.toBeNull();
        expect(input.type).toBe('checkbox');
        expect(input.checked).toBe(false);
      });

      it('should be checked if all todos completed', () => {
        const fixture = TestBed.createComponent(MainSectionComponent);
        const MainCmp = fixture.componentInstance;
        MainCmp.store.dispatch(actions.completeAll());
        fixture.detectChanges();
        const main = fixture.nativeElement;
        const input = main.querySelector('input');
        expect(input.checked).toBe(true);
      });

      it('should call completeAll on change', () => {
        const fixture = TestBed.createComponent(MainSectionComponent);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        spyOn(actions, 'completeAll').and.callThrough();
        const evt = new CustomEvent('click');
        input.dispatchEvent(evt);
        expect(actions.completeAll).toHaveBeenCalled();
      });
    });
  });

  describe('footer', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          store
        ],
        declarations: [
          MainSectionComponent,
          MockTodoItemComponent,
          FooterComponent
        ]
      });
      TestBed.compileComponents();
    }));

    it('should render', () => {
      const fixture = TestBed.createComponent(MainSectionComponent);
      fixture.detectChanges();
      const footer = fixture.nativeElement.querySelector('fountain-footer');
      expect(footer.querySelector('footer')).not.toBeNull();
      const FooterCmp = fixture.debugElement.query(By.css('fountain-footer')).componentInstance;
      expect(FooterCmp.completedCount).toBe(0);
      expect(FooterCmp.activeCount).toBe(1);
      expect(FooterCmp.filter.type).toBe(SHOW_ALL);
    });

    it('onShow should set the filter', () => {
      const fixture = TestBed.createComponent(MainSectionComponent);
      fixture.detectChanges();
      const FooterCmp = fixture.debugElement.query(By.css('fountain-footer')).componentInstance;
      FooterCmp.onShow.emit(SHOW_COMPLETED);
      fixture.detectChanges();
      expect(FooterCmp.filter.type).toBe(SHOW_COMPLETED);
    });

    it('onClearCompleted should call clearCompleted', () => {
      const fixture = TestBed.createComponent(MainSectionComponent);
      const MainCmp = fixture.componentInstance;
      MainCmp.store.dispatch(actions.completeAll());
      fixture.detectChanges();
      spyOn(actions, 'clearCompleted').and.callThrough();
      const FooterCmp = fixture.debugElement.query(By.css('fountain-footer')).componentInstance;
      FooterCmp.onClearCompleted.emit();
      fixture.detectChanges();
      expect(actions.clearCompleted).toHaveBeenCalled();
    });
  });

  describe('todo list', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          store
        ],
        declarations: [
          MainSectionComponent,
          TodoItemComponent,
          TodoTextInputComponent,
          MockFooterComponent
        ]
      });
      TestBed.compileComponents();
    }));

    it('should render', () => {
      const fixture = TestBed.createComponent(MainSectionComponent);
      const MainCmp = fixture.componentInstance;
      MainCmp.store.dispatch(actions.addTodo('Run the test'));
      fixture.detectChanges();
      const ul = fixture.nativeElement.querySelector('ul');
      expect(ul).not.toBeNull();
      const todoitems = fixture.debugElement.queryAllNodes(By.css('fountain-todo-item'));
      expect(todoitems.length).toBe(2);
      let todos;
      MainCmp.todos.subscribe((_todos: any) => {
        todos = _todos;
      });
      Array.prototype.forEach.call(todoitems, (item, i) => {
        expect(item.name).toBe('fountain-todo-item');
        expect(item.componentInstance.todo).toBe(todos[i]);
      });
    });

    it('should filter items', () => {
      const fixture = TestBed.createComponent(MainSectionComponent);
      fixture.detectChanges();
      const MainCmp = fixture.componentInstance;
      MainCmp.store.dispatch(actions.addTodo('Run the test'));
      MainCmp.store.dispatch(actions.completeTodo('1'));
      const FooterCmp = fixture.debugElement.query(By.css('fountain-footer')).componentInstance;
      FooterCmp.onShow.emit(SHOW_COMPLETED);
      const updatedList = fixture.debugElement.queryAllNodes(By.css('fountain-todo-item'));
      let todos;
      MainCmp.todos.subscribe((_todos: any) => {
        todos = _todos;
      });
      expect(updatedList.length).toBe(1);
      expect(updatedList[0].componentInstance.todo).toBe(todos[1]);
    });
  });
});
