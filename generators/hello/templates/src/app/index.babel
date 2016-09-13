<% if (router !== 'uirouter') { -%>
import {NgModule} from '@angular/core';
<% } -%>
import {BrowserModule} from '@angular/platform-browser';
<% if (router === 'uirouter') { -%>
import {UIView, UIRouterModule, provideUIRouter} from 'ui-router-ng2';
import {STATES, MyUIRouterConfig} from './routes';
<% } else if (router === 'router') { -%>
import {routing, RootComponent} from './routes';
<% } -%>

import {HelloComponent} from './hello';

<% if (router === 'uirouter') { -%>
@UIRouterModule({
<% } else { -%>
@NgModule({
<% } -%>
  imports: [
<% if (router === 'router') { -%>
    BrowserModule,
    routing
<% } else { -%>
    BrowserModule
<% } -%>
  ],
  declarations: [
<% if (router === 'router') { -%>
    RootComponent,
<% } -%>
    HelloComponent
  ],
<% if (router === 'uirouter') { -%>
  providers: [
    provideUIRouter({configClass: MyUIRouterConfig})
  ],
  states: STATES,
  bootstrap: [UIView]
<% } else if (router === 'router') { -%>
  bootstrap: [RootComponent]
<% } else { -%>
  bootstrap: [HelloComponent]
<% } -%>
})
export class AppModule {}
