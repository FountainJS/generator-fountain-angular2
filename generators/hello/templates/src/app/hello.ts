import {Component} from '@angular/core';

@Component({
  selector: 'App',
  template: '<h1>{{ hello }}</h1>'
})
export class Hello {
  public hello: string;

  constructor() {
    this.hello = 'Hello World!';
  }
}
