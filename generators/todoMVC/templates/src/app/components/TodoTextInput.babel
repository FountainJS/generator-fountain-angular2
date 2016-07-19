import {Component, Input, Output, EventEmitter, ViewChild, Renderer} from '@angular/core';

@Component({
  selector: 'fountain-todo-text-input',
  template: require('./TodoTextInput.html')
})
export class TodoTextInputComponent {
  @ViewChild('myInput') input;
  @Input() newTodo;
  @Input() editing;
  @Input() placeholder = '';
  @Output() onSave = new EventEmitter(false);
  @Input() text = '';

  constructor(renderer) {
    this.renderer = renderer;
  }

  static get parameters() {
    return [[Renderer]];
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus', []);
  }

  handleBlur() {
    if (!this.newTodo) {
      this.onSave.emit(this.text);
    }
  }

  handleSubmit(e) {
    if (e.keyCode === 13) {
      this.onSave.emit(this.text);
      if (this.newTodo) {
        this.text = '';
      }
    }
  }
}
