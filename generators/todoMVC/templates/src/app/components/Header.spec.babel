import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {provideStore} from '@ngrx/store';
import {Header} from './Header';
import {By} from '@angular/platform-browser';
import {async, inject, TestComponentBuilder, addProviders} from '@angular/core/testing';

describe('components', () => {
  let tcb;

  beforeEach(() => {
    addProviders([
      provideStore({}, {})
    ]);
  });

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  describe('Header', () => {
    it('should render correctly', async(inject([], () => {
      tcb.createAsync(Header)
        .then(fixture => {
          fixture.detectChanges();
          const header = fixture.nativeElement;
          expect(header.querySelector('header')).not.toBeNull();
          expect(header.querySelector('header').className).toBe('header');
          const h1 = header.querySelector('h1');
          expect(h1).not.toBeNull();
          expect(h1.textContent.trim()).toBe('todos');
          const todoTextInput = fixture.debugElement.query(By.css('TodoTextInput')).componentInstance;
          expect(todoTextInput.newTodo).toBe(true);
          expect(todoTextInput.placeholder).toBe('What needs to be done?');
        });
    })));

    it('should call addTodo if length of text is greater than 0', async(inject([], () => {
      tcb.createAsync(Header)
        .then(fixture => {
          fixture.detectChanges();
          const HeaderCmp = fixture.componentInstance;
          const todoTextInput = fixture.debugElement.query(By.css('TodoTextInput')).componentInstance;
          spyOn(HeaderCmp.store, 'dispatch');
          todoTextInput.onSave.emit('');
          expect(HeaderCmp.store.dispatch.calls.count()).toBe(0);
          todoTextInput.onSave.emit('Use ngrx/store');
          expect(HeaderCmp.store.dispatch.calls.count()).toBe(1);
        });
    })));
  });
});
