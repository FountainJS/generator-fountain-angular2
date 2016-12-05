import {Injectable} from '@angular/core';
import {UIRouter, Ng2StateDeclaration} from 'ui-router-ng2';

<% if (sample === 'hello') { -%>
import {HelloComponent} from './hello';
<% } else if (sample === 'techs') { -%>
import {MainComponent} from './main';
<% } else { -%>
import {AppComponent} from './containers/App';
<% } -%>

export const STATES: Ng2StateDeclaration[] = [
  {
    name: 'App',
    url: '/',
    component: <% if (sample === 'hello') { %>HelloComponent<% } else if (sample === 'techs') { %>MainComponent<% } else { %>AppComponent<% } %>
  }
];

@Injectable()
export class MyUIRouterConfig {
  configure(uiRouter: UIRouter) {
    uiRouter.urlRouterProvider.otherwise('App');
  }
}
