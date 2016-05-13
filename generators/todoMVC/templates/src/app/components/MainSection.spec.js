require('zone.js');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var ng = require('@angular/core');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');
var ngPlatform = require('@angular/platform-browser');
var ngrxStore = require('@ngrx/store');
var reducers = require('../reducers/todos');
var MainSection = require('./MainSection');
var TodoItem = require('./TodoItem');
var Footer = require('./Footer');
var actions = require('../actions/index');
var filters = require('../constants/TodoFilters');

var MockTodoItem = ng.Component({
  selector: 'TodoItem',
  template: '',
  inputs: ['todo']
})
.Class({
  constructor: function () {}
});

var MockFooter = ng.Component({
  selector: 'Footer',
  template: '',
  inputs: ['completedCount', 'activeCount', 'filter']
})
.Class({
  constructor: function () {}
});

ngTest.describe('components', function () {
  var tcb;

  ngTest.beforeEachProviders(function () {
    return [ngrxStore.provideStore(ngrxStore.combineReducers({todos: reducers.todos, visibility: reducers.visibility}), {})];
  });

  ngTest.beforeEach(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (_tcb) {
    tcb = _tcb;
  }));

  ngTest.describe('MainSection', function () {
    ngTest.it('should render container', ngTest.async(ngTest.inject([], function () {
      tcb
        .overrideDirective(MainSection, TodoItem, MockTodoItem)
        .overrideDirective(MainSection, Footer, MockFooter)
        .createAsync(MainSection)
        .then(function (fixture) {
          fixture.detectChanges();
          var main = fixture.nativeElement;
          ngTest.expect(main.querySelector('section')).not.toBeNull();
          ngTest.expect(main.querySelector('section').className).toBe('main');
        });
    })));

    ngTest.describe('toggle all input', function () {
      ngTest.it('should render', ngTest.async(ngTest.inject([], function () {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .overrideDirective(MainSection, Footer, MockFooter)
          .createAsync(MainSection)
          .then(function (fixture) { // eslint-disable-line max-nested-callbacks
            fixture.detectChanges();
            var main = fixture.nativeElement;
            var input = main.querySelector('input');
            ngTest.expect(input).not.toBeNull();
            ngTest.expect(input.type).toBe('checkbox');
            ngTest.expect(input.checked).toBe(false);
          });
      })));

      ngTest.it('should be checked if all todos completed', ngTest.async(ngTest.inject([], function () {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .overrideDirective(MainSection, Footer, MockFooter)
          .createAsync(MainSection)
          .then(function (fixture) { // eslint-disable-line max-nested-callbacks
            var MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.completeAll());
            fixture.detectChanges();
            var main = fixture.nativeElement;
            var input = main.querySelector('input');
            ngTest.expect(input.checked).toBe(true);
          });
      })));

      ngTest.it('should call completeAll on change', ngTest.fakeAsync(ngTest.inject([], function () {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .overrideDirective(MainSection, Footer, MockFooter)
          .createAsync(MainSection)
          .then(function (fixture) { // eslint-disable-line max-nested-callbacks
            fixture.detectChanges();
            var input = fixture.nativeElement.querySelector('input');
            spyOn(actions, 'completeAll').and.callThrough();
            var evt = new CustomEvent('click');
            input.dispatchEvent(evt);
            ngTest.expect(actions.completeAll).toHaveBeenCalled();
          });
      })));
    });

    ngTest.describe('footer', function () {
      ngTest.it('should render', ngTest.async(ngTest.inject([], function () {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .createAsync(MainSection)
          .then(function (fixture) { // eslint-disable-line max-nested-callbacks
            fixture.detectChanges();
            var footer = fixture.nativeElement.querySelector('footer');
            ngTest.expect(footer.querySelector('footer')).not.toBeNull();
            var FooterCmp = fixture.debugElement.query(ngPlatform.By.css('footer')).componentInstance;
            ngTest.expect(FooterCmp.completedCount).toBe(0);
            ngTest.expect(FooterCmp.activeCount).toBe(1);
            ngTest.expect(FooterCmp.selectedFilter.type).toBe(filters.SHOW_ALL);
          });
      })));

      ngTest.it('onShow should set the filter', ngTest.async(ngTest.inject([], function () {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .createAsync(MainSection)
          .then(function (fixture) { // eslint-disable-line max-nested-callbacks
            fixture.detectChanges();
            var FooterCmp = fixture.debugElement.query(ngPlatform.By.css('footer')).componentInstance;
            FooterCmp.onShow.emit(filters.SHOW_COMPLETED);
            fixture.detectChanges();
            ngTest.expect(FooterCmp.selectedFilter.type).toBe(filters.SHOW_COMPLETED);
          });
      })));

      ngTest.it('onClearCompleted should call clearCompleted', ngTest.async(ngTest.inject([], function () {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .createAsync(MainSection)
          .then(function (fixture) { // eslint-disable-line max-nested-callbacks
            var MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.completeAll());
            fixture.detectChanges();
            spyOn(actions, 'clearCompleted').and.callThrough();
            var FooterCmp = fixture.debugElement.query(ngPlatform.By.css('footer')).componentInstance;
            FooterCmp.onClearCompleted.emit();
            fixture.detectChanges();
            ngTest.expect(actions.clearCompleted).toHaveBeenCalled();
          });
      })));
    });

    ngTest.describe('todo list', function () {
      ngTest.it('should render', ngTest.async(ngTest.inject([], function () {
        tcb
          .overrideDirective(MainSection, Footer, MockFooter)
          .createAsync(MainSection)
          .then(function (fixture) { // eslint-disable-line max-nested-callbacks
            var MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.addTodo('Run the test'));
            fixture.detectChanges();
            var ul = fixture.nativeElement.querySelector('ul');
            ngTest.expect(ul).not.toBeNull();
            var todoitems = fixture.debugElement.queryAllNodes(ngPlatform.By.css('todoitem'));
            ngTest.expect(todoitems.length).toBe(2);
            var todos;
            MainCmp.todos.subscribe(function (_todos) { // eslint-disable-line max-nested-callbacks
              todos = _todos;
            });
            Array.prototype.forEach.call(todoitems, function (item, i) { // eslint-disable-line max-nested-callbacks
              ngTest.expect(item.name).toBe('TodoItem');
              ngTest.expect(item.componentInstance.todo).toBe(todos[i]);
            });
          });
      })));

      ngTest.it('should filter items', ngTest.async(ngTest.inject([], function () {
        tcb
          .overrideDirective(MainSection, TodoItem, MockTodoItem)
          .createAsync(MainSection)
          .then(function (fixture) { // eslint-disable-line max-nested-callbacks
            fixture.detectChanges();
            var MainCmp = fixture.componentInstance;
            MainCmp.store.dispatch(actions.addTodo('Run the test'));
            MainCmp.store.dispatch(actions.completeTodo('1'));
            var FooterCmp = fixture.debugElement.query(ngPlatform.By.css('footer')).componentInstance;
            FooterCmp.onShow.emit(filters.SHOW_COMPLETED);
            var updatedList = fixture.debugElement.queryAllNodes(ngPlatform.By.css('todoitem'));
            var todos;
            MainCmp.todos.subscribe(function (_todos) { // eslint-disable-line max-nested-callbacks
              todos = _todos;
            });
            ngTest.expect(updatedList.length).toBe(1);
            ngTest.expect(updatedList[0].componentInstance.todo).toBe(todos[1]);
          });
      })));
    });
  });
});
