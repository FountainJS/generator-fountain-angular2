var ng = require('@angular/core');
var ngTest = require('@angular/core/testing');
var ngPlatform = require('@angular/platform-browser');
var TodoItemComponent = require('./TodoItem');

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

describe('TodoItem component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent,
        MockTodoTextInputComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render the correct elements', function () {
    var fixture = ngTest.TestBed.createComponent(TodoItemComponent);
    var TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    fixture.detectChanges();
    var todoItem = fixture.nativeElement;
    var li = todoItem.querySelector('li');
    expect(li).not.toBeNull();
    expect(li.className).toBe('');
    var div = todoItem.querySelector('div');
    expect(div).not.toBeNull();
    expect(div.className).toBe('view');
    var input = todoItem.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.checked).toBe(false);
    var label = todoItem.querySelector('label');
    expect(label).not.toBeNull();
    expect(label.textContent.trim()).toBe('Use ngrx/store');
    var button = todoItem.querySelector('button');
    expect(button).not.toBeNull();
    expect(button.className).toBe('destroy');
  });

  it('should call onChange when click on input', function () {
    var fixture = ngTest.TestBed.createComponent(TodoItemComponent);
    fixture.detectChanges();
    var TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    var input = fixture.nativeElement.querySelector('input');
    spyOn(TodoItemCmp.onChange, 'emit');
    var evt = new CustomEvent('click');
    input.dispatchEvent(evt);
    expect(TodoItemCmp.onChange.emit).toHaveBeenCalledWith(0);
  });

  it('should call onDestroy when click on button', function () {
    var fixture = ngTest.TestBed.createComponent(TodoItemComponent);
    fixture.detectChanges();
    var TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    var button = fixture.nativeElement.querySelector('button');
    spyOn(TodoItemCmp.onDestroy, 'emit').and.callThrough();
    var evt = new CustomEvent('click');
    button.dispatchEvent(evt);
    expect(TodoItemCmp.onDestroy.emit).toHaveBeenCalledWith(0);
  });

  it(`should change class names to 'editing' when double click on label`, function () {
    var fixture = ngTest.TestBed.createComponent(TodoItemComponent);
    fixture.detectChanges();
    var TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    var label = fixture.nativeElement.querySelector('label');
    spyOn(TodoItemCmp.onDestroy, 'emit').and.callThrough();
    var evt = new CustomEvent('dblclick');
    label.dispatchEvent(evt);
    fixture.detectChanges();
    var li = fixture.nativeElement.querySelector('li');
    expect(li.className).toBe('editing');
  });

  it('should render the correct input when editing is true', function () {
    var fixture = ngTest.TestBed.createComponent(TodoItemComponent);
    var TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.editing = true;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    fixture.detectChanges();
    var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('fountain-todo-text-input')).componentInstance;
    expect(todoTextInput).not.toBeNull();
    expect(todoTextInput.text).toBe('Use ngrx/store');
    expect(todoTextInput.editing).toBe(true);
  });

  it('should call handleSave when onSave event is emitted', function () {
    var fixture = ngTest.TestBed.createComponent(TodoItemComponent);
    var TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.todo = {
      id: 0,
      text: 'Use ngrx/store',
      completed: false
    };
    TodoItemCmp.editing = true;
    fixture.detectChanges();
    spyOn(TodoItemCmp.onSave, 'emit');
    var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('fountain-todo-text-input')).componentInstance;
    spyOn(todoTextInput.onSave, 'emit').and.callThrough();
    spyOn(TodoItemCmp, 'handleSave');
    fixture.detectChanges();
    todoTextInput.onSave.emit('Edit todo');
    expect(TodoItemCmp.handleSave).toHaveBeenCalledWith('Edit todo');
  });

  it('should remove class name when onSave event is emitted', function () {
    var fixture = ngTest.TestBed.createComponent(TodoItemComponent);
    var TodoItemCmp = fixture.componentInstance;
    TodoItemCmp.editing = true;
    fixture.detectChanges();
    spyOn(TodoItemCmp.onSave, 'emit');
    var todoTextInput = fixture.debugElement.query(ngPlatform.By.css('fountain-todo-text-input')).componentInstance;
    spyOn(todoTextInput.onSave, 'emit').and.callThrough();
    spyOn(TodoItemCmp, 'handleSave').and.callFake(function () { // eslint-disable-line max-nested-callbacks
      TodoItemCmp.editing = false;
    });
    todoTextInput.onSave.emit('Use ngrx/store');
    fixture.detectChanges();
    var li = fixture.nativeElement.querySelector('li');
    expect(li.className).toBe('');
  });
});
