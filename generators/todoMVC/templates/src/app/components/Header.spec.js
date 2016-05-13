require('zone.js');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var ngrxStore = require('@ngrx/store');
var Header = require('./Header');
var ngPlatform = require('@angular/platform-browser');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');

ngTest.describe('components', function () {
  var tcb;

  ngTest.beforeEachProviders(function () {
    return [ngrxStore.provideStore({}, {})];
  });

  ngTest.beforeEach(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (_tcb) {
    tcb = _tcb;
  }));

  ngTest.describe('Header', function () {
    ngTest.it('should render correctly', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Header)
        .then(function (fixture) {
          fixture.detectChanges();
          var header = fixture.nativeElement;
          ngTest.expect(header.querySelector('header')).not.toBeNull();
          ngTest.expect(header.querySelector('header').className).toBe('header');
          var h1 = header.querySelector('h1');
          ngTest.expect(h1).not.toBeNull();
          ngTest.expect(h1.textContent.trim()).toBe('todos');
          var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('TodoTextInput')).componentInstance;
          ngTest.expect(todoTextInput.newTodo).toBe(true);
          ngTest.expect(todoTextInput.placeholder).toBe('What needs to be done?');
        });
    })));

    ngTest.it('should call addTodo if length of text is greater than 0', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Header)
        .then(function (fixture) {
          fixture.detectChanges();
          var HeaderCmp = fixture.componentInstance;
          var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('TodoTextInput')).componentInstance;
          spyOn(HeaderCmp.store, 'dispatch');
          todoTextInput.onSave.emit('');
          ngTest.expect(HeaderCmp.store.dispatch.calls.count()).toBe(0);
          todoTextInput.onSave.emit('Use ngrx/store');
          ngTest.expect(HeaderCmp.store.dispatch.calls.count()).toBe(1);
        });
    })));
  });
});
