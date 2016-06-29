import {Component} from '@angular/core';

@Component({
  selector: 'Header',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'header.html'
<% } else { -%>
  template: require('./header.html')
<% } -%>
})
export class Header {}
