import {Component, Input} from 'angular2/core';

@Component({
  selector: 'Tech',
  template: `
    <div class="tech">
      <img class="tech-logo" [src]="tech.logo"/>
      <h3 class="tech-h3">
        {{ tech.title }}
      </h3>
      <p>{{ tech.text1 }}</p>
      <p>{{ tech.text2 }}</p>
    </div>
  `
})
export class Tech {
  @Input() tech;
}
