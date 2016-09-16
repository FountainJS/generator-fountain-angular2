import {Component} from '@angular/core';

@Component({
  selector: '<%- componentName %>',
  template: require('./<%- name %>.html')
})
export class <%- className %> {
  public text: string;

  constructor() {
    this.text = 'My brand new component!';
  }
}
