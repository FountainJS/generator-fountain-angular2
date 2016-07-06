import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {TechComponent} from './tech';

export class Tech {
  constructor(
    public logo: string,
    public title: string,
    public text1: string,
    public text2: string
  ) {}
}

@Component({
  selector: 'Techs',
  template: require('./techs.html'),
  directives: [TechComponent],
  providers: [HTTP_PROVIDERS]
})
export class Techs {
  public techs: Tech[];
  public tech: Tech;

  constructor(public http: Http) {
    this.getTechs().subscribe(result => this.techs = result);
  }

  getTechs(): Observable<Tech[]> {
    return this.http
      .get('app/techs/techs.json')
      .map(response => response.json());
  }
}
