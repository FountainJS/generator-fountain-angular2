/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {Component, Input} from '@angular/core';
import {async, inject, TestComponentBuilder, ComponentFixture, addProviders} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideStore, combineReducers} from '@ngrx/store';
import {todos, visibility} from '../reducers/todos';
import {MainSectionComponent} from './MainSection';
import {TodoItemComponent} from './TodoItem';
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
}

describe('components', () => {
  let tcb: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      provideStore(combineReducers({todos, visibility}), {})
    ]);
  });

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  describe('MainSection', () => {
    it('should render container', async(inject([], () => {
      tcb
        .overrideDirective(MainSectionComponent, TodoItemComponent, MockTodoItemComponent)
        .overrideDirective(MainSectionComponent, FooterComponent, MockFooterComponent)
        .createAsync(MainSectionComponent)
        .then((fixture: ComponentFixture<any>) => {
          fixture.detectChanges();
          const main = fixture.nativeElement;
          expect(main.querySelector('section')).not.toBeNull();
          expect(main.querySelector('section').className).toBe('main');
        });
    })));

    describe('toggle all input', () => {
      it('should render', async(inject([], () => {
        tcb
          .overrideDirective(MainSectionComponent, TodoItemComponent, MockTodoItemComponent)
          .overrideDirective(MainSectionComponent, FooterComponent, MockFooterComponent)
          .createAsync(MainSectionComponent)
          .then((fixture: ComponentFixture<any>) => {
            fixture.detectChanges();
            const main = fixture.nativeElement;
            const input = main.querySelector('input');
            expect(input).not.toBeNull();
            expect(input.type).toBe('checkbox');
            expect(input.checked).toBe(false);
          });
      })));

      it('should be checked if all todos completed', async(inject([], () => {
        tcb
          .overrideDirective(MainSectionComponent, TodoItemComponent, MockTodoItemComponent)
          .overrideDirective(MainSectionComponent, FooterComponent, MockFooterComponent)
          .createAsync(MainSectionComponent)
          .then((fixture: ComponentFixture<any>) => {
            const MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.completeAll());
            fixture.detectChanges();
            const main = fixture.nativeElement;
            const input = main.querySelector('input');
            expect(input.checked).toBe(true);
          });
      })));

      it('should call completeAll on change', async(inject([], () => {
        tcb
          .overrideDirective(MainSectionComponent, TodoItemComponent, MockTodoItemComponent)
          .overrideDirective(MainSectionComponent, FooterComponent, MockFooterComponent)
          .createAsync(MainSectionComponent)
          .then((fixture: ComponentFixture<any>) => {
            fixture.detectChanges();
            const input = fixture.nativeElement.querySelector('input');
            spyOn(actions, 'completeAll').and.callThrough();
            const evt = new CustomEvent('click');
            input.dispatchEvent(evt);
            expect(actions.completeAll).toHaveBeenCalled();
          });
      })));
    });

    describe('footer', () => {
      it('should render', async(inject([], () => {
        tcb
          .overrideDirective(MainSectionComponent, TodoItemComponent, MockTodoItemComponent)
          .createAsync(MainSectionComponent)
          .then((fixture: ComponentFixture<any>) => {
            fixture.detectChanges();
            const footer = fixture.nativeElement.querySelector('fountain-footer');
            expect(footer.querySelector('footer')).not.toBeNull();
            const FooterCmp = fixture.debugElement.query(By.css('fountain-footer')).componentInstance;
            expect(FooterCmp.completedCount).toBe(0);
            expect(FooterCmp.activeCount).toBe(1);
            expect(FooterCmp.filter.type).toBe(SHOW_ALL);
          });
      })));

      it('onShow should set the filter', async(inject([], () => {
        tcb
          .overrideDirective(MainSectionComponent, TodoItemComponent, MockTodoItemComponent)
          .createAsync(MainSectionComponent)
          .then((fixture: ComponentFixture<any>) => {
            fixture.detectChanges();
            const FooterCmp = fixture.debugElement.query(By.css('fountain-footer')).componentInstance;
            FooterCmp.onShow.emit(SHOW_COMPLETED);
            fixture.detectChanges();
            expect(FooterCmp.filter.type).toBe(SHOW_COMPLETED);
          });
      })));

      it('onClearCompleted should call clearCompleted', async(inject([], () => {
        tcb
          .overrideDirective(MainSectionComponent, TodoItemComponent, MockTodoItemComponent)
          .createAsync(MainSectionComponent)
          .then((fixture: ComponentFixture<any>) => {
            const MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.completeAll());
            fixture.detectChanges();
            spyOn(actions, 'clearCompleted').and.callThrough();
            const FooterCmp = fixture.debugElement.query(By.css('fountain-footer')).componentInstance;
            FooterCmp.onClearCompleted.emit();
            fixture.detectChanges();
            expect(actions.clearCompleted).toHaveBeenCalled();
          });
      })));
    });

    describe('todo list', () => {
      it('should render', async(inject([], () => {
        tcb
          .overrideDirective(MainSectionComponent, FooterComponent, MockFooterComponent)
          .createAsync(MainSectionComponent)
          .then((fixture: ComponentFixture<any>) => {
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
      })));

      it('should filter items', async(inject([], () => {
        tcb
          .overrideDirective(MainSectionComponent, TodoItemComponent, MockTodoItemComponent)
          .createAsync(MainSectionComponent)
          .then((fixture: ComponentFixture<any>) => {
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
      })));
    });
  });
});
