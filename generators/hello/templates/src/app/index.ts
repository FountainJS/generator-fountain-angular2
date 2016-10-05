import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
<% if (router === 'uirouter') { -%>
import {UIView, UIRouterModule} from 'ui-router-ng2';
import {STATES, MyUIRouterConfig} from './routes';
<% } else if (router === 'router') { -%>
import {routing, RootComponent} from './routes';
<% } -%>

import {HelloComponent} from './hello';

@NgModule({
  imports: [
    BrowserModule,
<% if (router === 'router') { -%>
    routing
<% } else if (router === 'uirouter') { -%>
    UIRouterModule.forRoot({states: STATES, configClass: MyUIRouterConfig})
<% } -%>
  ],
  declarations: [
<% if (router === 'router') { -%>
    RootComponent,
<% } -%>
    HelloComponent
  ],
<% if (router === 'uirouter') { -%>
  bootstrap: [UIView]
<% } else if (router === 'router') { -%>
  bootstrap: [RootComponent]
<% } else { -%>
  bootstrap: [HelloComponent]
<% } -%>
})
export class AppModule {}
