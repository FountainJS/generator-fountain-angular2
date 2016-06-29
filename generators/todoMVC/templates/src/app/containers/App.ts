import {Component} from '@angular/core';
import {Header} from '../components/Header.ts';
import {MainSection} from '../components/MainSection.ts';

@Component({
  selector: 'App',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'App.html',
<% } else { -%>
  template: require('./App.html'),
<% } -%>
  directives: [Header, MainSection]
})
export class App {
}
