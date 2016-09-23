/// <reference path="../../../typings/index.d.ts"/>

import {FooterComponent} from './Footer';
import {TestBed, async} from '@angular/core/testing';
import {SHOW_ACTIVE} from '../constants/TodoFilters';

describe('Footer component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render correctly', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const footer = fixture.nativeElement;
    expect(footer.querySelector('footer')).not.toBeNull();
    expect(footer.querySelector('footer').className).toBe('footer');
  });

  it('should display active count when 0', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.nativeElement;
    const FooterCmp = fixture.componentInstance;
    FooterCmp.activeCount = 0;
    fixture.detectChanges();
    expect(footer.querySelector('.todo-count').textContent.trim()).toBe('No items left');
  });

  it('should display active count when above 0', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.nativeElement;
    const FooterCmp = fixture.componentInstance;
    FooterCmp.activeCount = 1;
    fixture.detectChanges();
    expect(footer.querySelector('.todo-count').textContent.trim()).toBe('1 item left');
  });

  it('should call onShow when a filter is clicked', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.nativeElement;
    const FooterCmp = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(FooterCmp.onShow, 'emit');
    footer.querySelectorAll('a')[1].dispatchEvent(new Event('click'));
    expect(FooterCmp.onShow.emit).toHaveBeenCalledWith(SHOW_ACTIVE);
  });

  it('shouldnt show clear button when no completed todos', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.nativeElement;
    const FooterCmp = fixture.componentInstance;
    FooterCmp.completedCount = 0;
    fixture.detectChanges();
    expect(footer.querySelector('.clear-completed')).toBeNull();
  });

  it('should call onClearCompleted on clear button click', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.nativeElement;
    const FooterCmp = fixture.componentInstance;
    FooterCmp.completedCount = 1;
    fixture.detectChanges();
    spyOn(FooterCmp.onClearCompleted, 'emit');
    footer.querySelector('.clear-completed').dispatchEvent(new Event('click'));
    expect(FooterCmp.onClearCompleted.emit).toHaveBeenCalled();
  });
});
