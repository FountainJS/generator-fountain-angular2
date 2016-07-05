require('zone.js');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var ngrxStore = require('@ngrx/store');
var Header = require('./Header');
var ngPlatform = require('@angular/platform-browser');
var ngTest = require('@angular/core/testing');

describe('components', function () {
  var tcb;

  beforeEach(function () {
    ngTest.addProviders([ngrxStore.provideStore({}, {})]);
  });

  beforeEach(ngTest.inject([ngTest.TestComponentBuilder], function (_tcb) {
    tcb = _tcb;
  }));

  describe('Header', function () {
    it('should render correctly', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Header)
        .then(function (fixture) {
          fixture.detectChanges();
          var header = fixture.nativeElement;
          expect(header.querySelector('header')).not.toBeNull();
          expect(header.querySelector('header').className).toBe('header');
          var h1 = header.querySelector('h1');
          expect(h1).not.toBeNull();
          expect(h1.textContent.trim()).toBe('todos');
          var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('TodoTextInput')).componentInstance;
          expect(todoTextInput.newTodo).toBe(true);
          expect(todoTextInput.placeholder).toBe('What needs to be done?');
        });
    })));

    it('should call addTodo if length of text is greater than 0', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Header)
        .then(function (fixture) {
          fixture.detectChanges();
          var HeaderCmp = fixture.componentInstance;
          var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('TodoTextInput')).componentInstance;
          spyOn(HeaderCmp.store, 'dispatch');
          todoTextInput.onSave.emit('');
          expect(HeaderCmp.store.dispatch.calls.count()).toBe(0);
          todoTextInput.onSave.emit('Use ngrx/store');
          expect(HeaderCmp.store.dispatch.calls.count()).toBe(1);
        });
    })));
  });
});
