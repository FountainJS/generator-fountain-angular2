import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Tech} from './tech';

@Component({
  selector: 'Techs',
  template: `
    <div class="techs-container">
      <h2 class="techs-h2">
        Cooked with all these awesome technologies:
      </h2>
      <div class="techs">
        <Tech *ngFor="let tech of techs" [tech]="tech"></Tech>
      </div>
    </div>
  `,
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
