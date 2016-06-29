import {Component} from '@angular/core';

@Component({
  selector: 'TitleComponent',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'title.html'
<% } else { -%>
  template: require('./title.html')
<% } -%>
})
export class Title {}
