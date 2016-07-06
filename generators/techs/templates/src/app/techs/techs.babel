import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Tech} from './tech';

@Component({
  selector: 'Techs',
  template: require('./techs.html'),
  directives: [Tech],
  providers: [HTTP_PROVIDERS]
})
export class Techs {
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
