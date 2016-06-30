import {Component} from '@angular/core';
import {Header} from '../components/Header';
import {MainSection} from '../components/MainSection';

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
