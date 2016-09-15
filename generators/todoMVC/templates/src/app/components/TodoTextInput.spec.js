var ngTest = require('@angular/core/testing');
var ngForms = require('@angular/forms');
var TodoTextInputComponent = require('./TodoTextInput');

describe('TodoTextInput component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      imports: [
        ngForms.FormsModule
      ],
      declarations: [
        TodoTextInputComponent
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  it('should render correctly', ngTest.fakeAsync(function () {
    var fixture = ngTest.TestBed.createComponent(TodoTextInputComponent);
    var TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.text = 'Use ngrx/store';
    TodoTextInputCmp.placeholder = 'What needs to be done?';
    TodoTextInputCmp.editing = false;
    TodoTextInputCmp.newTodo = false;
    fixture.detectChanges();
    ngTest.tick();
    var input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe('What needs to be done?');
    expect(input.value).toBe('Use ngrx/store');
    expect(input.className).not.toContain('edit');
    expect(input.className).not.toContain('new-todo');
  }));

  it('should render correctly when editing=true', function () {
    var fixture = ngTest.TestBed.createComponent(TodoTextInputComponent);
    var TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.editing = true;
    fixture.detectChanges();
    var input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.className).toContain('edit');
  });

  it('should render correctly when newTodo=true', function () {
    var fixture = ngTest.TestBed.createComponent(TodoTextInputComponent);
    var TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.newTodo = true;
    fixture.detectChanges();
    var input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.className).toContain('new-todo');
  });

  it('should update value on change', function () {
    var fixture = ngTest.TestBed.createComponent(TodoTextInputComponent);
    var TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.editing = true;
    fixture.detectChanges();
    var input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    input.value = 'Use ngrx/store';
    input.dispatchEvent(new CustomEvent('input'));
    expect(TodoTextInputCmp.text).toBe('Use ngrx/store');
  });

  it('should call onSave on handleSubmit', function () {
    var fixture = ngTest.TestBed.createComponent(TodoTextInputComponent);
    fixture.detectChanges();
    var TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.text = 'Use ngrx/store';
    spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
    TodoTextInputCmp.handleSubmit({keyCode: 13});
    expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
  });

  it('should reset state on handleSubmit if newTodo', function () {
    var fixture = ngTest.TestBed.createComponent(TodoTextInputComponent);
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

  it('should call onSave on handleBlur', function () {
    var fixture = ngTest.TestBed.createComponent(TodoTextInputComponent);
    fixture.detectChanges();
    var TodoTextInputCmp = fixture.componentInstance;
    TodoTextInputCmp.newTodo = false;
    TodoTextInputCmp.text = 'Use ngrx/store';
    spyOn(TodoTextInputCmp.onSave, 'emit').and.callThrough();
    TodoTextInputCmp.handleBlur();
    expect(TodoTextInputCmp.onSave.emit).toHaveBeenCalledWith('Use ngrx/store');
  });
});
