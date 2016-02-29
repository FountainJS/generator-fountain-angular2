import {Component} from 'angular2/core';
import * as axios from 'axios';
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
  template: `
    <div class="techs-container">
      <h2 class="techs-h2">
        Cooked with all these awesome technologies:
      </h2>
      <div class="techs">
        <Tech *ngFor="#tech of techs" [tech]="tech"></Tech>
      </div>
    </div>
  `,
  directives: [TechComponent]
})
export class Techs {
  public techs: Tech[];
  public tech: Tech;

  constructor() {
    axios
      .get('app/techs/techs.json')
      .then(response => {
        this.techs = response.data as Tech[];
      });
  }
}
