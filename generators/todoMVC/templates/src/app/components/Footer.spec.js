require('zone.js');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var Footer = require('./Footer');
var ngTest = require('@angular/core/testing');
var ngCompilerTest = require('@angular/compiler/testing');
var filters = require('../constants/TodoFilters');

ngTest.describe('components', function () {
  var tcb;

  ngTest.beforeEach(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (_tcb) {
    tcb = _tcb;
  }));

  ngTest.describe('Footer', function () {
    ngTest.it('should render \'Test\'', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Footer)
        .then(function (fixture) {
          fixture.detectChanges();
          var footer = fixture.nativeElement;
          ngTest.expect(footer.querySelector('footer')).not.toBeNull();
          ngTest.expect(footer.querySelector('footer').className).toBe('footer');
        });
    })));

    ngTest.it('should display active count when 0', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Footer)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          FooterCmp.activeCount = 0;
          fixture.detectChanges();
          ngTest.expect(footer.querySelector('.todo-count').textContent.trim()).toBe('No items left');
        });
    })));

    ngTest.it('should display active count when above 0', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Footer)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          FooterCmp.activeCount = 1;
          fixture.detectChanges();
          ngTest.expect(footer.querySelector('.todo-count').textContent.trim()).toBe('1 item left');
        });
    })));

    ngTest.it('should call onShow when a filter is clicked', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Footer)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          fixture.detectChanges();
          spyOn(FooterCmp.onShow, 'emit');
          footer.querySelectorAll('a')[1].dispatchEvent(new Event('click'));
          ngTest.expect(FooterCmp.onShow.emit).toHaveBeenCalledWith(filters.SHOW_ACTIVE);
        });
    })));

    ngTest.it('shouldnt show clear button when no completed todos', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Footer)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          FooterCmp.completedCount = 0;
          fixture.detectChanges();
          ngTest.expect(footer.querySelector('.clear-completed')).toBeNull();
        });
    })));

    ngTest.it('should call onClearCompleted on clear button click', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(Footer)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          FooterCmp.completedCount = 1;
          fixture.detectChanges();
          spyOn(FooterCmp.onClearCompleted, 'emit');
          footer.querySelector('.clear-completed').dispatchEvent(new Event('click'));
          ngTest.expect(FooterCmp.onClearCompleted.emit).toHaveBeenCalled();
        });
    })));
  });
});
