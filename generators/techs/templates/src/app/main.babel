import {Component} from '@angular/core';
import {Header} from './header';
import {Title} from './title';
import {Techs} from './techs/techs';
import {Footer} from './footer';

@Component({
  selector: 'App',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'main.html',
<% } else { -%>
  template: require('./main.html'),
<% } -%>
  directives: [Header, Title, Techs, Footer]
})
export class Main {}
