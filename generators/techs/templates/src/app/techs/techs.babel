import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {TechComponent} from './tech';

@Component({
  selector: 'fountain-techs',
  template: require('./techs.html'),
  directives: [TechComponent],
  providers: [HTTP_PROVIDERS]
})
export class TechsComponent {
  constructor(http) {
    this.http = http;
    this.getTechs().subscribe(result => {
      this.techs = result;
    });
  }

  static get parameters() { // http://stackoverflow.com/questions/34800150/angular-2-es6-inject-http
    return [[Http]];
  }

  getTechs() {
    return this.http
      .get('app/techs/techs.json')
      .map(response => response.json());
  }
}
