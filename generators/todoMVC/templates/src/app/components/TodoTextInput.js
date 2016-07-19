var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'fountain-todo-text-input',
  template: require('./TodoTextInput.html'),
  inputs: [
    'newTodo',
    'editing',
    'placeholder',
    'text'
  ],
  outputs: ['onSave'],
  queries: {
    input: new ng.ViewChild('myInput')
  }
})
.Class({
  constructor: [ng.Renderer, function (renderer) {
    this.renderer = renderer;
    this.onSave = new ng.EventEmitter(false);
    this.text = this.text || '';
  }],

  ngAfterViewInit: function () {
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus', []);
  },

  handleBlur: function () {
    if (!this.newTodo) {
      this.onSave.emit(this.text);
    }
  },

  handleSubmit: function (e) {
    if (e.keyCode === 13) {
      this.onSave.emit(this.text);
      if (this.newTodo) {
        this.text = '';
      }
    }
  }
});
