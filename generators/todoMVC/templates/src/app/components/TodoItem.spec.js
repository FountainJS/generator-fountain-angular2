require('zone.js');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var ng = require('@angular/core');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');
var ngPlatform = require('@angular/platform-browser');
var TodoTextInput = require('./TodoTextInput');
var TodoItem = require('./TodoItem');

var MockTodoTextInput = ng.Component({
  selector: 'TodoTextInput',
  template: '',
  inputs: ['newTodo', 'editing', 'placeholder', 'text']
})
.Class({
  constructor: function () {}
});

ngTest.describe('components', function () {
  var tcb;

  ngTest.beforeEach(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (_tcb) {
    tcb = _tcb;
  }));

  ngTest.describe('TodoItem', function () {
    ngTest.it('initial render', ngTest.async(ngTest.inject([], function () {
      tcb
        .overrideDirective(TodoItem, TodoTextInput, MockTodoTextInput)
        .createAsync(TodoItem)
        .then(function (fixture) {
          var TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.todo = {
            id: 0,
            text: 'Use ngrx/store',
            completed: false
          };
          fixture.detectChanges();
          var todoItem = fixture.nativeElement;
          var li = todoItem.querySelector('li');
          ngTest.expect(li).not.toBeNull();
          ngTest.expect(li.className).toBe('');
          var div = todoItem.querySelector('div');
          ngTest.expect(div).not.toBeNull();
          ngTest.expect(div.className).toBe('view');
          var input = todoItem.querySelector('input');
          ngTest.expect(input).not.toBeNull();
          ngTest.expect(input.checked).toBe(false);
          var label = todoItem.querySelector('label');
          ngTest.expect(label).not.toBeNull();
          ngTest.expect(label.textContent.trim()).toBe('Use ngrx/store');
          var button = todoItem.querySelector('button');
          ngTest.expect(button).not.toBeNull();
          ngTest.expect(button.className).toBe('destroy');
        });
    })));

    ngTest.it('input onChange should call completeTodo', ngTest.fakeAsync(ngTest.inject([], function () {
      tcb
        .overrideDirective(TodoItem, TodoTextInput, MockTodoTextInput)
        .createAsync(TodoItem)
        .then(function (fixture) {
          ngTest.tick();
          fixture.detectChanges();
          var TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.todo = {
            id: 0,
            text: 'Use ngrx/store',
            completed: false
          };
          var input = fixture.nativeElement.querySelector('input');
          spyOn(TodoItemCmp.onChange, 'emit');
          var evt = new CustomEvent('click');
          input.dispatchEvent(evt);
          ngTest.tick(50);
          ngTest.expect(TodoItemCmp.onChange.emit).toHaveBeenCalledWith(0);
        });
    })));

    ngTest.it('button onClick should call deleteTodo', ngTest.fakeAsync(ngTest.inject([], function () {
      tcb
        .overrideDirective(TodoItem, TodoTextInput, MockTodoTextInput)
        .createAsync(TodoItem)
        .then(function (fixture) {
          ngTest.tick();
          fixture.detectChanges();
          var TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.todo = {
            id: 0,
            text: 'Use ngrx/store',
            completed: false
          };
          var button = fixture.nativeElement.querySelector('button');
          spyOn(TodoItemCmp.onDestroy, 'emit').and.callThrough();
          var evt = new CustomEvent('click');
          button.dispatchEvent(evt);
          ngTest.tick(50);
          ngTest.expect(TodoItemCmp.onDestroy.emit).toHaveBeenCalledWith(0);
        });
    })));

    ngTest.it('label onDoubleClick should put component in edit state', ngTest.async(ngTest.inject([], function () {
      tcb
        .overrideDirective(TodoItem, TodoTextInput, MockTodoTextInput)
        .createAsync(TodoItem)
        .then(function (fixture) {
          fixture.detectChanges();
          var TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.todo = {
            id: 0,
            text: 'Use ngrx/store',
            completed: false
          };
          var label = fixture.nativeElement.querySelector('label');
          spyOn(TodoItemCmp.onDestroy, 'emit').and.callThrough();
          var evt = new CustomEvent('dblclick');
          label.dispatchEvent(evt);
          fixture.detectChanges();
          var li = fixture.nativeElement.querySelector('li');
          ngTest.expect(li.className).toBe('editing');
        });
    })));

    ngTest.it('edit state render', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoItem)
        .then(function (fixture) {
          var TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.editing = true;
          TodoItemCmp.todo = {
            id: 0,
            text: 'Use ngrx/store',
            completed: false
          };
          fixture.detectChanges();
          var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('todotextinput')).componentInstance;
          ngTest.expect(todoTextInput).not.toBeNull();
          ngTest.expect(todoTextInput.text).toBe('Use ngrx/store');
          ngTest.expect(todoTextInput.editing).toBe(true);
        });
    })));

    ngTest.it('TodoTextInput onSave should call editTodo', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoItem)
        .then(function (fixture) {
          var TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.editing = true;
          fixture.detectChanges();
          spyOn(TodoItemCmp.onSave, 'emit');
          var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('todotextinput')).componentInstance;
          spyOn(todoTextInput.onSave, 'emit').and.callThrough();
          spyOn(TodoItemCmp, 'handleSave');
          fixture.detectChanges();
          todoTextInput.onSave.emit('Use ngrx/store');
          ngTest.expect(TodoItemCmp.handleSave).toHaveBeenCalledWith('Use ngrx/store');
        });
    })));

    ngTest.it('TodoTextInput onSave should exit component from edit state', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoItem)
        .then(function (fixture) {
          var TodoItemCmp = fixture.componentInstance;
          TodoItemCmp.editing = true;
          fixture.detectChanges();
          spyOn(TodoItemCmp.onSave, 'emit');
          var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('todotextinput')).componentInstance;
          spyOn(todoTextInput.onSave, 'emit').and.callThrough();
          spyOn(TodoItemCmp, 'handleSave').and.callFake(function () { // eslint-disable-line max-nested-callbacks
            TodoItemCmp.editing = false;
          });
          todoTextInput.onSave.emit('Use ngrx/store');
          fixture.detectChanges();
          var li = fixture.nativeElement.querySelector('li');
          ngTest.expect(li.className).toBe('');
        });
    })));
  });
});
