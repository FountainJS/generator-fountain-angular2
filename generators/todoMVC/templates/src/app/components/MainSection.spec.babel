import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {Component, Input} from '@angular/core';
import {async, inject, TestComponentBuilder, addProviders} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideStore, combineReducers} from '@ngrx/store';
import {todos, visibility} from '../reducers/todos';
import {MainSection} from './MainSection';
import {TodoItem} from './TodoItem';
import {Footer} from './Footer';
import * as actions from '../actions/index';
import {SHOW_ALL, SHOW_COMPLETED} from '../constants/TodoFilters';

@Component({
  selector: 'TodoItem',
  template: ''
})
class MockTodoItem {
  @Input() todo;
}

@Component({
  selector: 'Footer',
  template: ''
})
class MockFooter {
  @Input() completedCount;
  @Input() activeCount;
  @Input() filter;
}

describe('components', () => {
  let tcb;

  beforeEach(() => {
    addProviders([
      provideStore(combineReducers({todos, visibility}), {})
    ]);
  });

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  describe('MainSection', () => {
    it('should render container', async(inject([], () => {
      tcb
        .overrideDirective(MainSection, TodoItem, MockTodoItem)
        .overrideDirective(MainSection, Footer, MockFooter)
        .createAsync(MainSection)
        .then(fixture => {
          fixture.detectChanges();
          const main = fixture.nativeElement;
          expect(main.querySelector('section')).not.toBeNull();
          expect(main.querySelector('section').className).toBe('main');
        });
    })));

    describe('toggle all input', () => {
      it('should render', async(inject([], () => {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .overrideDirective(MainSection, Footer, MockFooter)
          .createAsync(MainSection)
          .then(fixture => { // eslint-disable-line max-nested-callbacks
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
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .overrideDirective(MainSection, Footer, MockFooter)
          .createAsync(MainSection)
          .then(fixture => { // eslint-disable-line max-nested-callbacks
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
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .overrideDirective(MainSection, Footer, MockFooter)
          .createAsync(MainSection)
          .then(fixture => { // eslint-disable-line max-nested-callbacks
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
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .createAsync(MainSection)
          .then(fixture => { // eslint-disable-line max-nested-callbacks
            fixture.detectChanges();
            const footer = fixture.nativeElement.querySelector('footer');
            expect(footer.querySelector('footer')).not.toBeNull();
            const FooterCmp = fixture.debugElement.query(By.css('footer')).componentInstance;
            expect(FooterCmp.completedCount).toBe(0);
            expect(FooterCmp.activeCount).toBe(1);
            expect(FooterCmp.selectedFilter.type).toBe(SHOW_ALL);
          });
      })));

      it('onShow should set the filter', async(inject([], () => {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .createAsync(MainSection)
          .then(fixture => { // eslint-disable-line max-nested-callbacks
            fixture.detectChanges();
            const FooterCmp = fixture.debugElement.query(By.css('footer')).componentInstance;
            FooterCmp.onShow.emit(SHOW_COMPLETED);
            fixture.detectChanges();
            expect(FooterCmp.selectedFilter.type).toBe(SHOW_COMPLETED);
          });
      })));

      it('onClearCompleted should call clearCompleted', async(inject([], () => {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .createAsync(MainSection)
          .then(fixture => { // eslint-disable-line max-nested-callbacks
            const MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.completeAll());
            fixture.detectChanges();
            spyOn(actions, 'clearCompleted').and.callThrough();
            const FooterCmp = fixture.debugElement.query(By.css('footer')).componentInstance;
            FooterCmp.onClearCompleted.emit();
            fixture.detectChanges();
            expect(actions.clearCompleted).toHaveBeenCalled();
          });
      })));
    });

    describe('todo list', () => {
      it('should render', async(inject([], () => {
        tcb
          .overrideDirective(MainSection, Footer, MockFooter)
          .createAsync(MainSection)
          .then(fixture => { // eslint-disable-line max-nested-callbacks
            const MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.addTodo('Run the test'));
            fixture.detectChanges();
            const ul = fixture.nativeElement.querySelector('ul');
            expect(ul).not.toBeNull();
            const todoitems = fixture.debugElement.queryAllNodes(By.css('todoitem'));
            expect(todoitems.length).toBe(2);
            let todos;
            MainCmp.todos.subscribe(_todos => { // eslint-disable-line max-nested-callbacks
              todos = _todos;
            });
            Array.prototype.forEach.call(todoitems, (item, i) => { // eslint-disable-line max-nested-callbacks
              expect(item.name).toBe('TodoItem');
              expect(item.componentInstance.todo).toBe(todos[i]);
            });
          });
      })));

      it('should filter items', async(inject([], () => {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .createAsync(MainSection)
          .then(fixture => { // eslint-disable-line max-nested-callbacks
            fixture.detectChanges();
            const MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.addTodo('Run the test'));
            MainCmp.store.dispatch(actions.completeTodo('1'));
            const FooterCmp = fixture.debugElement.query(By.css('footer')).componentInstance;
            FooterCmp.onShow.emit(SHOW_COMPLETED);
            const updatedList = fixture.debugElement.queryAllNodes(By.css('todoitem'));
            let todos;
            MainCmp.todos.subscribe(_todos => { // eslint-disable-line max-nested-callbacks
              todos = _todos;
            });
            expect(updatedList.length).toBe(1);
            expect(updatedList[0].componentInstance.todo).toBe(todos[1]);
          });
      })));
    });
  });
});
