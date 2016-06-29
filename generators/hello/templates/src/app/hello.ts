import {Component} from '@angular/core';

@Component({
  selector: 'App',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'hello.html'
<% } else { -%>
  template: require('./hello.html')
<% } -%>
})
export class Hello {
  public hello: string;

  constructor() {
    this.hello = 'Hello World!';
  }
}
