<% if (router !== 'uirouter') { -%>
import {NgModule} from '@angular/core';
<% } -%>
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
<% if (router === 'uirouter') { -%>
import {UIView, UIRouterModule, provideUIRouter} from 'ui-router-ng2';
import {STATES, MyUIRouterConfig} from './routes';
<% } else if (router === 'router') { -%>
import {routing, RootComponent} from './routes';
<% } -%>
import {store} from './reducers';

import {AppComponent} from './containers/App';
import {FooterComponent} from './components/Footer';
import {HeaderComponent} from './components/Header';
import {MainSectionComponent} from './components/MainSection';
import {TodoItemComponent} from './components/TodoItem';
import {TodoTextInputComponent} from './components/TodoTextInput';

<% if (router === 'uirouter') { -%>
@UIRouterModule({
<% } else { -%>
@NgModule({
<% } -%>
  imports: [
    BrowserModule,
    FormsModule,
<% if (router === 'router') { -%>
    routing,
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
  providers: [
    provideUIRouter({configClass: MyUIRouterConfig}),
  ],
  states: STATES,
  bootstrap: [UIView]
<% } else if (router === 'router') { -%>
  bootstrap: [RootComponent]
<% } else { -%>
  bootstrap: [AppComponent]
<% } -%>
})
export class AppModule {}
