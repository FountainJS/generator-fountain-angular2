require('zone.js');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');
var TodoTextInput = require('./TodoTextInput');

ngTest.describe('components', function () {
  var tcb;

  ngTest.beforeEach(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (_tcb) {
    tcb = _tcb;
  }));

  ngTest.describe('TodoTextInput', function () {
    ngTest.it('should render correctly', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.text = 'Use ngrx/store';
          TodoTextInputCmp.placeholder = 'What needs to be done?';
          TodoTextInputCmp.editing = false;
          TodoTextInputCmp.newTodo = false;
          fixture.detectChanges();
          var input = fixture.nativeElement.querySelector('input');
          ngTest.expect(input).not.toBeNull();
          ngTest.expect(input.placeholder).toBe('What needs to be done?');
          ngTest.expect(input.value).toBe('Use ngrx/store');
          ngTest.expect(input.className).not.toContain('edit');
          ngTest.expect(input.className).not.toContain('new-todo');
        });
    })));

    ngTest.it('should render correctly when editing=true', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.editing = true;
          fixture.detectChanges();
          var input = fixture.nativeElement.querySelector('input');
          ngTest.expect(input).not.toBeNull();
          ngTest.expect(input.className).toContain('edit');
        });
    })));

    ngTest.it('should render correctly when newTodo=true', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = true;
          fixture.detectChanges();
          var input = fixture.nativeElement.querySelector('input');
          ngTest.expect(input).not.toBeNull();
          ngTest.expect(input.className).toContain('new-todo');
        });
    })));

    ngTest.it('should update value on change', ngTest.fakeAsync(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          ngTest.tick();
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.editing = true;
          fixture.detectChanges();
          var input = fixture.nativeElement.querySelector('input');
          ngTest.expect(input).not.toBeNull();
          input.value = 'Use ngrx/store';
          var evt = new CustomEvent('input');
          input.dispatchEvent(evt);
          ngTest.tick(50);
          ngTest.expect(TodoTextInputCmp.text).toBe('Use ngrx/store');
        });
    })));

    ngTest.it('should call onSave on handleSubmit', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          fixture.detectChanges();
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.text = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleSubmit({keyCode: 13});
          ngTest.expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
        });
    })));

    ngTest.it('should reset state on handleSubmit if newTodo', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = true;
          var input = fixture.nativeElement.querySelector('input');
          ngTest.expect(input).not.toBeNull();
          input.value = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleSubmit({keyCode: 13});
          fixture.detectChanges();
          ngTest.expect(input.value).toBe('');
        });
    })));

    ngTest.it('should call onSave on handleBlur', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          fixture.detectChanges();
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = false;
          TodoTextInputCmp.text = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleBlur();
          ngTest.expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
        });
    })));
  });
});
