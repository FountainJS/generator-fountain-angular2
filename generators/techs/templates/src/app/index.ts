import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
<% if (router === 'uirouter') { -%>
import {UIView, UIRouterModule} from 'ui-router-ng2';
import {STATES, MyUIRouterConfig} from './routes';
<% } else if (router === 'router') { -%>
import {routing, RootComponent} from './routes';
<% } -%>

import {TechsModule} from './techs<%- modules === 'systemjs' ? '/index' : '' %>';

import {MainComponent} from './main';
import {HeaderComponent} from './header';
import {TitleComponent} from './title';
import {FooterComponent} from './footer';

@NgModule({
  imports: [
    BrowserModule,
<% if (router === 'router') { -%>
    routing,
<% } else if (router === 'uirouter') { -%>
    UIRouterModule.forRoot({states: STATES, configClass: MyUIRouterConfig}),
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
  bootstrap: [UIView]
<% } else if (router === 'router') { -%>
  bootstrap: [RootComponent]
<% } else { -%>
  bootstrap: [MainComponent]
<% } -%>
})
export class AppModule {}
