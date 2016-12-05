import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
<% if (sample === 'hello') { -%>
import {HelloComponent} from './hello';
<% } else if (sample === 'techs') { -%>
import {MainComponent} from './main';
<% } else { -%>
import {AppComponent} from './containers/App';
<% } -%>

@Component({
  selector: 'fountain-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    component: <% if (sample === 'hello') { %>HelloComponent<% } else if (sample === 'techs') { %>MainComponent<% } else { %>AppComponent<% } %>
  }
];

export const routing = RouterModule.forRoot(routes);
