require('zone.js');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var ngTest = require('@angular/core/testing');
var TodoTextInput = require('./TodoTextInput');

describe('components', function () {
  var tcb;

  beforeEach(ngTest.inject([ngTest.TestComponentBuilder], function (_tcb) {
    tcb = _tcb;
  }));

  describe('TodoTextInput', function () {
    it('should render correctly', ngTest.async(ngTest.inject([], function () {
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
          expect(input).not.toBeNull();
          expect(input.placeholder).toBe('What needs to be done?');
          expect(input.value).toBe('Use ngrx/store');
          expect(input.className).not.toContain('edit');
          expect(input.className).not.toContain('new-todo');
        });
    })));

    it('should render correctly when editing=true', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.editing = true;
          fixture.detectChanges();
          var input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          expect(input.className).toContain('edit');
        });
    })));

    it('should render correctly when newTodo=true', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = true;
          fixture.detectChanges();
          var input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          expect(input.className).toContain('new-todo');
        });
    })));

    it('should update value on change', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.editing = true;
          fixture.detectChanges();
          var input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          input.value = 'Use ngrx/store';
          var evt = new CustomEvent('input');
          input.dispatchEvent(evt);
          expect(TodoTextInputCmp.text).toBe('Use ngrx/store');
        });
    })));

    it('should call onSave on handleSubmit', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          fixture.detectChanges();
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.text = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleSubmit({keyCode: 13});
          expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
        });
    })));

    it('should reset state on handleSubmit if newTodo', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = true;
          var input = fixture.nativeElement.querySelector('input');
          expect(input).not.toBeNull();
          input.value = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleSubmit({keyCode: 13});
          fixture.detectChanges();
          expect(input.value).toBe('');
        });
    })));

    it('should call onSave on handleBlur', ngTest.async(ngTest.inject([], function () {
      tcb
        .createAsync(TodoTextInput)
        .then(function (fixture) {
          fixture.detectChanges();
          var TodoTextInputCmp = fixture.componentInstance;
          TodoTextInputCmp.newTodo = false;
          TodoTextInputCmp.text = 'Use ngrx/store';
          spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
          TodoTextInputCmp.handleBlur();
          expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
        });
    })));
  });
});
