var ng = require('@angular/core');
var ngPlatformBrowser = require('@angular/platform-browser');
var ngForms = require('@angular/forms');
<% if (router === 'uirouter') { -%>
var uiRouter = require('ui-router-ng2');
<% } -%>
var myRoutes = require('./routes');
var store = require('./reducers<%- modules === 'systemjs' ? '/index' : '' %>');

var AppComponent = require('./containers/App');
var FooterComponent = require('./components/Footer');
var HeaderComponent = require('./components/Header');
var MainSectionComponent = require('./components/MainSection');
var TodoItemComponent = require('./components/TodoItem');
var TodoTextInputComponent = require('./components/TodoTextInput');

module.exports = ng.NgModule({
  imports: [
    ngPlatformBrowser.BrowserModule,
    ngForms.FormsModule,
<% if (router === 'router') { -%>
    myRoutes.routing,
<% } else if (router === 'uirouter') { -%>
    uiRouter.UIRouterModule.forRoot({states: myRoutes.STATES, configClass: myRoutes.MyUIRouterConfig}),
<% } -%>
    store
  ],
  declarations: [
<% if (router === 'router') { -%>
    myRoutes.RootComponent,
<% } -%>
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainSectionComponent,
    TodoItemComponent,
    TodoTextInputComponent
  ],
<% if (router === 'uirouter') { -%>
  bootstrap: [uiRouter.UIView]
<% } else if (router === 'router') { -%>
  bootstrap: [myRoutes.RootComponent]
<% } else { -%>
  bootstrap: [AppComponent]
<% } -%>
<% if (router !== 'uirouter') { -%>
})
.Class({
  constructor: function () {}
});
<% } else { -%>
})(
  ng.Class({
    constructor: function () {}
  })
);
<% } -%>
