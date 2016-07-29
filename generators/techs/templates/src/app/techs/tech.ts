import {Component, Input} from '@angular/core';
import {Tech} from './techs';

@Component({
  selector: 'fountain-tech',
  template: require('./tech.html')
})
export class TechComponent {
  @Input() public tech: Tech;
}
