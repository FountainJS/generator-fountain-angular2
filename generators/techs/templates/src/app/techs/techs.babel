import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'fountain-techs',
  template: require('./techs.html')
})
@Inject('Http')
export class TechsComponent {
  constructor(http: Http) {
    this.http = http;
    this.getTechs().subscribe(result => {
      this.techs = result;
    });
  }

  getTechs() {
    return this.http
      .get('app/techs/techs.json')
      .map(response => response.json());
  }
}
