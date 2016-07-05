import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {Footer} from './Footer';
import {async, inject, TestComponentBuilder} from '@angular/core/testing';
import {SHOW_ACTIVE} from '../constants/TodoFilters';

describe('components', () => {
  let tcb;

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  describe('Footer', () => {
    it('should render \'Test\'', async(inject([], () => {
      tcb.createAsync(Footer)
        .then(fixture => {
          fixture.detectChanges();
          const footer = fixture.nativeElement;
          expect(footer.querySelector('footer')).not.toBeNull();
          expect(footer.querySelector('footer').className).toBe('footer');
        });
    })));

    it('should display active count when 0', async(inject([], () => {
      tcb.createAsync(Footer)
        .then(fixture => {
          const footer = fixture.nativeElement;
          const FooterCmp = fixture.componentInstance;
          FooterCmp.activeCount = 0;
          fixture.detectChanges();
          expect(footer.querySelector('.todo-count').textContent.trim()).toBe('No items left');
        });
    })));

    it('should display active count when above 0', async(inject([], () => {
      tcb.createAsync(Footer)
        .then(fixture => {
          const footer = fixture.nativeElement;
          const FooterCmp = fixture.componentInstance;
          FooterCmp.activeCount = 1;
          fixture.detectChanges();
          expect(footer.querySelector('.todo-count').textContent.trim()).toBe('1 item left');
        });
    })));

    it('should call onShow when a filter is clicked', async(inject([], () => {
      tcb.createAsync(Footer)
        .then(fixture => {
          const footer = fixture.nativeElement;
          const FooterCmp = fixture.componentInstance;
          fixture.detectChanges();
          spyOn(FooterCmp.onShow, 'emit');
          footer.querySelectorAll('a')[1].dispatchEvent(new Event('click'));
          expect(FooterCmp.onShow.emit).toHaveBeenCalledWith(SHOW_ACTIVE);
        });
    })));

    it('shouldnt show clear button when no completed todos', async(inject([], () => {
      tcb.createAsync(Footer)
        .then(fixture => {
          const footer = fixture.nativeElement;
          const FooterCmp = fixture.componentInstance;
          FooterCmp.completedCount = 0;
          fixture.detectChanges();
          expect(footer.querySelector('.clear-completed')).toBeNull();
        });
    })));

    it('should call onClearCompleted on clear button click', async(inject([], () => {
      tcb.createAsync(Footer)
        .then(fixture => {
          const footer = fixture.nativeElement;
          const FooterCmp = fixture.componentInstance;
          FooterCmp.completedCount = 1;
          fixture.detectChanges();
          spyOn(FooterCmp.onClearCompleted, 'emit');
          footer.querySelector('.clear-completed').dispatchEvent(new Event('click'));
          expect(FooterCmp.onClearCompleted.emit).toHaveBeenCalled();
        });
    })));
  });
});
