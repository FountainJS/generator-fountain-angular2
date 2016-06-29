import {Component} from '@angular/core';

@Component({
  selector: 'Footer',
<% if (modules === 'systemjs') { -%>
  moduleId: __moduleName,
  templateUrl: 'footer.html'
<% } else { -%>
  template: require('./footer.html')
<% } -%>
})
export class Footer {}
