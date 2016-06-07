import {Component, Input, Output, EventEmitter, ElementRef, Renderer, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'TodoTextInput',
  template: `
    <input
      #myInput
      [ngClass]="{'edit': editing, 'new-todo': newTodo}"
      [(ngModel)]="text"
      (keypress)="handleSubmit($event)"
      (blur)="handleBlur()"
      [placeholder]="placeholder"
      type="text"
    />
  `
})
export class TodoTextInput implements AfterViewInit {
  @ViewChild('myInput') input: ElementRef;
  @Input() newTodo: boolean;
  @Input() editing: boolean;
  @Input() placeholder: string = '';
  @Output() onSave: EventEmitter<any> = new EventEmitter(false);
  @Input() text: string = '';

  constructor(private renderer: Renderer) {
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus', []);
  }

  handleBlur() {
    if (!this.newTodo) {
      this.onSave.emit(this.text);
    }
  }

  handleSubmit(e: any) {
    if (e.keyCode === 13) {
      this.onSave.emit(this.text);
      if (this.newTodo) {
        this.text = '';
      }
    }
  }
}
