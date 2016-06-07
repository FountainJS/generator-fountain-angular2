/// <reference path="../typings/index.d.ts"/>

import {Injectable} from '@angular/core';
import {UIRouter} from 'ui-router-ng2/router';
<% if (sample === 'hello') { -%>
import {Hello} from './app/hello';
<% } else if (sample === 'techs') { -%>
import {Main} from './app/main';
<% } else { -%>
import {App} from './app/containers/App';
<% } -%>

const INITIAL_STATES: any[] = [
  {name: 'App', url: '/', component: <% if (sample === 'hello') { -%>Hello<% } else if (sample === 'techs') { -%>Main<% } else { -%>App<% } -%>}
];

@Injectable()
export class MyUIRouterConfig {
  configure(uiRouter: UIRouter) {
    uiRouter.urlRouterProvider.otherwise(() => uiRouter.stateService.go('App', null, null));
    uiRouter.stateRegistry.root();
    INITIAL_STATES.forEach(state => uiRouter.stateRegistry.register(state));
  }
}
