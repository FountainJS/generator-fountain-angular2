var ng = require('@angular/core');
var ngrxStore = require('@ngrx/store');
var HeaderComponent = require('./Header');
var ngPlatform = require('@angular/platform-browser');
var ngTest = require('@angular/core/testing');

var MockTodoTextInputComponent = ng.Component({
  selector: 'fountain-todo-text-input',
  template: '',
  inputs: ['newTodo', 'editing', 'placeholder', 'text'],
  outputs: ['onSave']
})
.Class({
  constructor: function () {
    this.onSave = new ng.EventEmitter(false);
  }
});

describe('Header component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      imports: [
        ngrxStore.StoreModule.provideStore({}, {})
      ],
      declarations: [
        HeaderComponent,
        MockTodoTextInputComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render correctly', function () {
    const fixture = ngTest.TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    var header = fixture.nativeElement;
    expect(header.querySelector('header')).not.toBeNull();
    expect(header.querySelector('header').className).toBe('header');
    var h1 = header.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent.trim()).toBe('todos');
    var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('fountain-todo-text-input')).componentInstance;
    expect(todoTextInput.newTodo).toBe(true);
    expect(todoTextInput.placeholder).toBe('What needs to be done?');
  });

  it('should call addTodo if length of text is greater than 0', function () {
    const fixture = ngTest.TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    var HeaderCmp = fixture.componentInstance;
    var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('fountain-todo-text-input')).componentInstance;
    spyOn(HeaderCmp.store, 'dispatch');
    todoTextInput.onSave.emit('');
    expect(HeaderCmp.store.dispatch.calls.count()).toBe(0);
    todoTextInput.onSave.emit('Use ngrx/store');
    expect(HeaderCmp.store.dispatch.calls.count()).toBe(1);
  });
});
