var ng = require('@angular/core');
var ngForms = require('@angular/forms');
var ngTest = require('@angular/core/testing');
var ngPlatform = require('@angular/platform-browser');
var ngrxStore = require('@ngrx/store');
var reducers = require('../reducers/todos');
var MainSectionComponent = require('./MainSection');
var TodoItemComponent = require('./TodoItem');
var TodoTextInputComponent = require('./TodoTextInput');
var FooterComponent = require('./Footer');
var actions = require('../actions/index');
var filters = require('../constants/TodoFilters');

var MockTodoItemComponent = ng.Component({
  selector: 'fountain-todo-item',
  template: '',
  inputs: ['todo']
})
.Class({
  constructor: function () {}
});

var MockFooterComponent = ng.Component({
  selector: 'fountain-footer',
  template: '',
  inputs: ['completedCount', 'activeCount', 'filter'],
  outputs: ['onClearCompleted', 'onShow']
})
.Class({
  constructor: function () {
    this.onClearCompleted = new ng.EventEmitter(false);
    this.onShow = new ng.EventEmitter(false);
  }
});

var store = ngrxStore.StoreModule.provideStore(ngrxStore.combineReducers({
  todos: reducers.todos,
  visibility: reducers.visibility
}), {});

describe('MainSection component', function () {
  describe('mocked', function () {
    beforeEach(ngTest.async(function () {
      ngTest.TestBed.configureTestingModule({
        imports: [
          store
        ],
        declarations: [
          MainSectionComponent,
          MockTodoItemComponent,
          MockFooterComponent
        ]
      });
      ngTest.TestBed.compileComponents();
    }));

    it('should render container', function () {
      var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
      fixture.detectChanges();
      var main = fixture.nativeElement;
      expect(main.querySelector('section')).not.toBeNull();
      expect(main.querySelector('section').className).toBe('main');
    });

    describe('toggle all input', function () {
      it('should render', function () {
        var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
        fixture.detectChanges();
        var main = fixture.nativeElement;
        var input = main.querySelector('input');
        expect(input).not.toBeNull();
        expect(input.type).toBe('checkbox');
        expect(input.checked).toBe(false);
      });

      it('should be checked if all todos completed', function () {
        var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
        var MainCmp = fixture.componentInstance;
        MainCmp.store.dispatch(actions.completeAll());
        fixture.detectChanges();
        var main = fixture.nativeElement;
        var input = main.querySelector('input');
        expect(input.checked).toBe(true);
      });

      it('should call completeAll on change', function () {
        var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
        fixture.detectChanges();
        var input = fixture.nativeElement.querySelector('input');
        spyOn(actions, 'completeAll').and.callThrough();
        var evt = new CustomEvent('click');
        input.dispatchEvent(evt);
        expect(actions.completeAll).toHaveBeenCalled();
      });
    });
  });

  describe('footer', function () {
    beforeEach(ngTest.async(function () {
      ngTest.TestBed.configureTestingModule({
        imports: [
          store
        ],
        declarations: [
          MainSectionComponent,
          MockTodoItemComponent,
          FooterComponent
        ]
      });
      ngTest.TestBed.compileComponents();
    }));

    it('should render', function () {
      var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
      fixture.detectChanges();
      var footer = fixture.nativeElement.querySelector('fountain-footer');
      expect(footer.querySelector('footer')).not.toBeNull();
      var FooterCmp = fixture.debugElement.query(ngPlatform.By.css('fountain-footer')).componentInstance;
      expect(FooterCmp.completedCount).toBe(0);
      expect(FooterCmp.activeCount).toBe(1);
      expect(FooterCmp.filter.type).toBe(filters.SHOW_ALL);
    });

    it('onShow should set the filter', function () {
      var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
      fixture.detectChanges();
      var FooterCmp = fixture.debugElement.query(ngPlatform.By.css('fountain-footer')).componentInstance;
      FooterCmp.onShow.emit(filters.SHOW_COMPLETED);
      fixture.detectChanges();
      expect(FooterCmp.filter.type).toBe(filters.SHOW_COMPLETED);
    });

    it('onClearCompleted should call clearCompleted', function () {
      var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
      var MainCmp = fixture.componentInstance;
      MainCmp.store.dispatch(actions.completeAll());
      fixture.detectChanges();
      spyOn(actions, 'clearCompleted').and.callThrough();
      var FooterCmp = fixture.debugElement.query(ngPlatform.By.css('fountain-footer')).componentInstance;
      FooterCmp.onClearCompleted.emit();
      fixture.detectChanges();
      expect(actions.clearCompleted).toHaveBeenCalled();
    });
  });

  describe('todo list', function () {
    beforeEach(ngTest.async(function () {
      ngTest.TestBed.configureTestingModule({
        imports: [
          ngForms.FormsModule,
          store
        ],
        declarations: [
          MainSectionComponent,
          TodoItemComponent,
          TodoTextInputComponent,
          MockFooterComponent
        ]
      });
      ngTest.TestBed.compileComponents();
    }));

    it('should render', function () {
      var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
      var MainCmp = fixture.componentInstance;
      MainCmp.store.dispatch(actions.addTodo('Run the test'));
      fixture.detectChanges();
      var ul = fixture.nativeElement.querySelector('ul');
      expect(ul).not.toBeNull();
      var todoitems = fixture.debugElement.queryAllNodes(ngPlatform.By.css('fountain-todo-item'));
      expect(todoitems.length).toBe(2);
      var todos;
      MainCmp.todos.subscribe(function (_todos) { // eslint-disable-line max-nested-callbacks
        todos = _todos;
      });
      Array.prototype.forEach.call(todoitems, function (item, i) { // eslint-disable-line max-nested-callbacks
        expect(item.name).toBe('fountain-todo-item');
        expect(item.componentInstance.todo).toBe(todos[i]);
      });
    });

    it('should filter items', function () {
      var fixture = ngTest.TestBed.createComponent(MainSectionComponent);
      fixture.detectChanges();
      var MainCmp = fixture.componentInstance;
      MainCmp.store.dispatch(actions.addTodo('Run the test'));
      MainCmp.store.dispatch(actions.completeTodo('1'));
      var FooterCmp = fixture.debugElement.query(ngPlatform.By.css('fountain-footer')).componentInstance;
      FooterCmp.onShow.emit(filters.SHOW_COMPLETED);
      var updatedList = fixture.debugElement.queryAllNodes(ngPlatform.By.css('fountain-todo-item'));
      var todos;
      MainCmp.todos.subscribe(function (_todos) { // eslint-disable-line max-nested-callbacks
        todos = _todos;
      });
      expect(updatedList.length).toBe(1);
      expect(updatedList[0].componentInstance.todo).toBe(todos[1]);
    });
  });
});
