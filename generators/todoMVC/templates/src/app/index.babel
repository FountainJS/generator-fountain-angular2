import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
<% if (router === 'uirouter') { -%>
import {UIView, UIRouterModule} from 'ui-router-ng2';
import {STATES, MyUIRouterConfig} from './routes';
<% } else if (router === 'router') { -%>
import {routing, RootComponent} from './routes';
<% } -%>
import {store} from './reducers<%- modules === 'systemjs' ? '/index' : '' %>';

import {AppComponent} from './containers/App';
import {FooterComponent} from './components/Footer';
import {HeaderComponent} from './components/Header';
import {MainSectionComponent} from './components/MainSection';
import {TodoItemComponent} from './components/TodoItem';
import {TodoTextInputComponent} from './components/TodoTextInput';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
<% if (router === 'router') { -%>
    routing,
<% } else if (router === 'uirouter') { -%>
    UIRouterModule.forRoot({states: STATES, configClass: MyUIRouterConfig}),
<% } -%>
    store
  ],
  declarations: [
<% if (router === 'router') { -%>
    RootComponent,
<% } -%>
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainSectionComponent,
    TodoItemComponent,
    TodoTextInputComponent
  ],
<% if (router === 'uirouter') { -%>
  bootstrap: [UIView]
<% } else if (router === 'router') { -%>
  bootstrap: [RootComponent]
<% } else { -%>
  bootstrap: [AppComponent]
<% } -%>
})
export class AppModule {}
