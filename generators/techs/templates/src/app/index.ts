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

import {TechsModule} from './techs';

import {MainComponent} from './main';
import {HeaderComponent} from './header';
import {TitleComponent} from './title';
import {FooterComponent} from './footer';

<% if (router === 'uirouter') { -%>
@UIRouterModule({
<% } else { -%>
@NgModule({
<% } -%>
  imports: [
    BrowserModule,
<% if (router === 'router') { -%>
    routing,
<% } -%>
    TechsModule
  ],
  declarations: [
<% if (router === 'router') { -%>
    RootComponent,
<% } -%>
    MainComponent,
    HeaderComponent,
    TitleComponent,
    FooterComponent
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
  bootstrap: [MainComponent]
<% } -%>
})
export class AppModule {}
