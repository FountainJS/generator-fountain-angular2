/// <reference path="../typings/index.d.ts"/>

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouterConfig} from '@angular/router';
<% if (sample === 'hello') { -%>
import {HelloComponent} from './app/hello';
<% } else if (sample === 'techs') { -%>
import {MainComponent} from './app/main';
<% } else { -%>
import {AppComponent} from './app/containers/App';
<% } -%>

@Component({
  selector: 'fountain-root',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
export class RootComponent {
}

export const routes: RouterConfig = [
  {
    path: '',
    component: <% if (sample === 'hello') { -%>HelloComponent<% } else if (sample === 'techs') { -%>MainComponent<% } else { -%>AppComponent<% } -%>

  }
];
